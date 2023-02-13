import { CommandInteraction, User, EmbedBuilder } from "discord.js";
import { Game } from "../../lib/chess.js";

import supabase from "../../lib/supabase.js";

import { isNull, isEmpty } from "underscore";

function parseResults(games: Game[], id: string) {
  let total = 0;
  let opponents: { [key: string]: number[] } = {};

  for (let game of games) {
    if (game.blancs == id && !isNull(game.noirs)) {
      opponents[game.noirs] = [
        (opponents[game.noirs] ? opponents[game.noirs][0] : 0) + game.résultat,
        (opponents[game.noirs] ? opponents[game.noirs][1] : 0) + 1,
      ];

      total += game.résultat;
    } else if (game.blancs != id && !isNull(game.blancs)) {
      opponents[game.blancs] = [
        (opponents[game.blancs] ? opponents[game.blancs][0] : 0) +
          1 -
          game.résultat,
        (opponents[game.blancs] ? opponents[game.blancs][1] : 0) + 1,
      ];

      total += 1 - game.résultat;
    }
  }

  return {
    total,
    opponents,
  };
}

function displayUser(
  scores: {
    total: number;
    opponents: { [key: string]: number[] };
  },
  user: User,
  length: number
) {
  let embed = new EmbedBuilder()
    .setTitle(`Résumé de l'utilisateur`)
    .setAuthor({
      name: user.username,
      iconURL: user.avatarURL()||undefined
    })
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription(
      `**Parties de <@${user.id}>**` +
        `\nScore total: **${scores.total}/${length}**`
    );

  embed.addFields({
    name: "Adversaires",
    value: Object.entries(scores.opponents)
      .map((i) => `<@${i[0]}> : ${i[1][0]}/${i[1][1]}`)
      .join("\n"),
  });

  return embed;
}

export default async function (interaction: CommandInteraction) {
  const user = interaction.options.getUser("utilisateur", true);

  let games: Game[] | null = (
    await supabase
      .from("chess")
      .select("*")
      .or(`blancs.eq.${user.id},noirs.eq.${user.id}`)
  ).data;


  if (isNull(games) || isEmpty(games)) {
    await interaction.reply(
      "❌ L'utilisateur n'a pas de parties enregistrées."
    );
    return;
  }

  let results = parseResults(games, user.id);

  await interaction.reply({
    embeds: [displayUser(results, user, games.length)],
    allowedMentions: { parse: [] },
  });
}

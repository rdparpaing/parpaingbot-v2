import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Game } from "../../lib/chess.js";

import supabase from "../../lib/supabase.js";

import { isNull } from "underscore";

let results = {
  0: "0-1",
  1: "1-0",
  0.5: "½-½",
};

function displayGame(game: Game) {
  let embed = new EmbedBuilder()
    .setTitle(`Partie n°${game.id}`)
    .setDescription(`Résultat: **${results[game.résultat]}**`);

  if (game.blancs) {
    embed.addFields({
      name: "Blancs",
      value: `<@${game.blancs}>`,
      inline: true,
    });
  }

  if (game.noirs) {
    embed.addFields({
      name: "Noirs",
      value: `<@${game.noirs}>`,
      inline: true,
    });
  }

  if (game.lien) {
    embed.addFields({
      name: "Voir la partie:",
      value: game.lien,
    });
  }

  return embed;
}

export default async function (interaction: CommandInteraction) {
  const id = interaction.options.get("id", true).value;

  let game: Game[] | null = (
    await supabase.from("chess").select("*").eq("id", id)
  ).data;

  if (isNull(game) || !game) {
    await interaction.reply("❌ La partie n'existe pas.");
    return;
  }

  await interaction.reply({
    embeds: [displayGame(game[0])],
    allowedMentions: { parse: [] },
  });
}

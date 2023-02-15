import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";

import add from "./chess/add.js";
import remove from "./chess/remove.js";
import fetch from "./chess/fetch.js";
import fetchUser from "./chess/fetchUser.js";

import commands from "../public/strings.js";
const { chess } = commands.commands;

async function execute(interaction: ChatInputCommandInteraction) {
  const sub = interaction.options.getSubcommand();

  switch (sub) {
    case "add":
      await add(interaction);
      break;
    case "remove":
      await remove(interaction);
      break;
    case "game":
      await fetch(interaction);
      break;
    case "user":
      await fetchUser(interaction);
      break;
  }
}

const _add = (
  s: SlashCommandSubcommandBuilder
): SlashCommandSubcommandBuilder =>
  s
    .setName("add")
    .setDescription(chess.subc.add.desc)
    .addStringOption((o) =>
      o
        .setName("lien")
        .setDescription(chess.subc.add.options.lien)
        .setRequired(true)
    )
    .addNumberOption((o) =>
      o
        .setName("résultat")
        .setDescription(chess.subc.add.options.résultat)
        .addChoices(
          { name: "1-0", value: 1 },
          { name: "0-1", value: 0 },
          { name: "½-½", value: 0.5 }
        )
        .setRequired(true)
    )
    .addUserOption((o) =>
      o.setName("blancs").setDescription(chess.subc.add.options.blancs)
    )
    .addUserOption((o) =>
      o.setName("noirs").setDescription(chess.subc.add.options.noirs)
    );

const _remove = (
  s: SlashCommandSubcommandBuilder
): SlashCommandSubcommandBuilder =>
  s
    .setName("remove")
    .setDescription(chess.subc.remove.desc)
    .addStringOption((o) =>
      o
        .setName("id")
        .setDescription(chess.subc.remove.options.id)
        .setRequired(true)
    );

const _get = (
  g: SlashCommandSubcommandGroupBuilder
): SlashCommandSubcommandGroupBuilder =>
  g
    .setName("get")
    .setDescription(chess.subc.get.desc)
    .addSubcommand((s) =>
      s
        .setName("user")
        .setDescription(chess.subc.fetchUser.desc)
        .addUserOption((o) =>
          o
            .setName("utilisateur")
            .setDescription(chess.subc.fetchUser.options.membre)
            .setRequired(true)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("game")
        .setDescription(chess.subc.fetch.desc)
        .addStringOption((o) =>
          o
            .setName("id")
            .setDescription(chess.subc.fetch.options.id)
            .setRequired(true)
        )
    );

const c = {
  data: new SlashCommandBuilder()
    .setName("chess")
    .setDescription(chess.desc)
    .addSubcommand(_add)
    .addSubcommand(_remove)
    .addSubcommandGroup(_get),
  execute,
};

export default c;

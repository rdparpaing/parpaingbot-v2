import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";

import fetch from "./archive/fetch.js";
import create from "./archive/create.js";
import random from "./archive/random.js";
import __delete from "./archive/delete.js";
import _alias from "./archive/alias.js";

import commands from "../public/strings.js";
const { archive } = commands.commands;

async function execute(interaction: ChatInputCommandInteraction) {
  const sub = interaction.options.getSubcommand();

  switch (sub) {
    case "fetch":
      await fetch(interaction);
      break;
    case "create":
      await create(interaction);
      break;
    case "random":
      await random(interaction);
      break;
    case "delete":
      await __delete(interaction);
      break;
    case "alias":
      await _alias(interaction);
      break;
  }
}

const get = (
  g: SlashCommandSubcommandGroupBuilder
): SlashCommandSubcommandGroupBuilder =>
  g
    .setName("get")
    .setDescription(archive.subc.get.desc)
    .addSubcommand((s) =>
      s
        .setName("fetch")
        .setDescription(archive.subc.fetch.desc)
        .addStringOption((o) =>
          o
            .setName("référence")
            .setDescription(archive.subc.fetch.options.référence)
            .setRequired(true)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("random")
        .setDescription(archive.subc.random.desc)
        .addStringOption((o) =>
          o.setName("tag").setDescription(archive.subc.random.options.tag)
        )
    );

const _create = (
  s: SlashCommandSubcommandBuilder
): SlashCommandSubcommandBuilder =>
  s
    .setName("create")
    .setDescription(archive.subc.create.desc)
    .addStringOption((o) =>
      o
        .setName("tag")
        .setDescription(archive.subc.create.options.tag)
        .setRequired(true)
    )
    .addAttachmentOption((o) =>
      o.setName("fichier").setDescription(archive.subc.create.options.fichier)
    )
    .addStringOption((o) =>
      o
        .setName("commentaire")
        .setDescription(archive.subc.create.options.commentaire)
    )
    .addStringOption((o) =>
      o.setName("alias").setDescription(archive.subc.create.options.alias)
    );

const _delete = (
  s: SlashCommandSubcommandBuilder
): SlashCommandSubcommandBuilder =>
  s
    .setName("delete")
    .setDescription(archive.subc.delete.desc)
    .addNumberOption((o) =>
      o
        .setName("id")
        .setDescription(archive.subc.delete.options.id)
        .setRequired(true)
    );

const alias = (
  s: SlashCommandSubcommandBuilder
): SlashCommandSubcommandBuilder =>
  s
    .setName("alias")
    .setDescription(archive.subc.alias.desc)
    .addNumberOption((o) =>
      o
        .setName("id")
        .setDescription(archive.subc.alias.options.id)
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName("alias")
        .setDescription(archive.subc.alias.options.alias)
        .setRequired(true)
    );

const _archive = {
  data: new SlashCommandBuilder()
    .setName("archive")
    .setDescription(archive.desc)
    .addSubcommandGroup(get)
    .addSubcommand(_create)
    .addSubcommand(_delete)
    .addSubcommand(alias),
  execute,
};

export default _archive;

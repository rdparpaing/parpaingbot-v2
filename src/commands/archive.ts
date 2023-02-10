import { 
  ChatInputCommandInteraction, 
  SlashCommandBuilder, 
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder 
} from "discord.js";

import fetch from "./archive/fetch";
import create from "./archive/create";
import random from "./archive/random";
import __delete from "./archive/delete";
import _alias from "./archive/alias";

async function execute(interaction: ChatInputCommandInteraction) {
  const sub = interaction.options.getSubcommand()

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

const get = (g: SlashCommandSubcommandGroupBuilder): SlashCommandSubcommandGroupBuilder => (
  g
   .setName("get")
   .setDescription("Recherches dans l'archive")
   .addSubcommand(s => (
    s
     .setName("fetch")
     .setDescription("Cherche un post avec son ID/alias.")
     .addStringOption((o) =>
        o
         .setName("référence")
         .setDescription("La référence du post à chercher.")
         .setRequired(true)
      )
   ))
   .addSubcommand(s => (
    s
     .setName("random")
     .setDescription("Renvoie un post aléatoire selon un tag.")
     .addStringOption((o) =>
        o
         .setName("tag")
         .setDescription("Le tag à parcourir.")
      )
   ))
)

const _create =  (s: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder => (
  s
  .setName("create")
  .setDescription("Créée un post. (Il faut ajouter au moins un commentaire ou un fichier)")
  .addStringOption(o =>(
    o
     .setName("tag")
     .setDescription("La catégorie dans laquelle le post doit être rangé.")
     .setRequired(true)
  ))
  .addAttachmentOption(o => (
    o
     .setName("fichier")
     .setDescription("Le fichier à stocker.")
  ))
  .addStringOption(o => (
    o
     .setName("commentaire")
     .setDescription("Le commentaire à ajouter.")
  ))
  .addStringOption(o => (
    o
     .setName("alias")
     .setDescription("Un petit nom pour retrouver le post plus facilement.")
  ))
)

const _delete = (s: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder => (
  s
  .setName("delete")
  .setDescription("Supprime un post.")
  .addNumberOption((o) =>
     o
      .setName("id")
      .setDescription("L'ID du post à supprimer.")
      .setRequired(true)
   )
)

const alias =  (s: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder => (
  s
  .setName("alias")
  .setDescription("Associe à un post un alias (peut être réécrit).")
  .addNumberOption((o) =>
     o
      .setName("id")
      .setDescription("L'ID du post à associer.")
      .setRequired(true)
   )
   .addStringOption((o) =>
     o
      .setName("alias")
      .setDescription("Le petit nom du post.")
      .setRequired(true)
   )
)
  
const ping = {
  data: new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Actions sur l'archive de RdP.")
    .addSubcommandGroup(get)
    .addSubcommand(_create)
    .addSubcommand(_delete)
    .addSubcommand(alias),
  execute,
};

export default ping;

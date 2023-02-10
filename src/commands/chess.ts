import { 
  ChatInputCommandInteraction, 
  SlashCommandBuilder, 
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder 
} from "discord.js";

import fetch from "./archive/fetch.js";
import create from "./archive/create.js";
import random from "./archive/random.js";
import __delete from "./archive/delete.js";
import _alias from "./archive/alias.js";

async function execute(interaction: ChatInputCommandInteraction) {
  const sub = interaction.options.getSubcommand()

  switch (sub) {
    case "make-gif":
      break;
  }
}

const make_gif = (s: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder => (
  s
   .setName("make-gif")
   .setDescription("Crée un GIF à partir d'un PGN et l'envoie dans le chat.")
   .addStringOption(o => 
    o
     .setName("PGN")
     .setDescription("Le PGN de la partie à gérer")
     .setRequired(true)
    )
)

const ping = {
  data: new SlashCommandBuilder()
    .setName("chess")
    .setDescription("Les commandes relatives aux échecs (le jeu là pas ta vie).")
    .addSubcommand(make_gif),
    // .addSubcommandGroup(chessDB)
  execute,
};

export default ping;

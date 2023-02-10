import { ChatInputCommandInteraction, Attachment } from "discord.js";

import { isNull } from "underscore";

import supabase from "../../lib/supabase";

export default async function (interaction: ChatInputCommandInteraction) {
  const id = interaction.options.get("id", true).value;

  const res = 
    await supabase.from("archive")
                  .delete()
                  .eq("id", id)

  console.log(res)

  if (res.status) {

  }

  if (res.status != 204 || isNull(res.data)) {
    await interaction.reply("❌ Une erreur s'est produite (<@!677511817085452289>).")
    return;
  }

  // @ts-ignore
  await interaction.reply(`✅ Le post a été supprimé !`)
}
import { ChatInputCommandInteraction } from "discord.js";

import supabase from "../../lib/supabase.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const id = interaction.options.get("id", true).value;

  const res = await supabase.from("archive").delete().eq("id", id);

  if (res.status != 204) {
    await interaction.reply(
      "❌ Une erreur s'est produite (<@!677511817085452289>)."
    );
    return;
  }

  // @ts-ignore
  await interaction.reply(`✅ La partie a été supprimé !`);
}

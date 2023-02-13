import { ChatInputCommandInteraction, Attachment } from "discord.js";

import { isNull } from "underscore";

import supabase from "../../lib/supabase.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const id = interaction.options.get("id", true).value;
  const alias = interaction.options.get("alias", true).value;

  const check = await supabase
    .from("archive")
    .select("*", { count: "exact", head: true })
    .eq("id", id);

  if (check.status != 200) {
    await interaction.reply(
      "❌ Une erreur s'est produite (<@!677511817085452289>)."
    );
    return;
  }

  if (isNull(check.count) || check.count < 1) {
    await interaction.reply("❌ Aucun post n'existe avec cet id.");
    return;
  }

  if (/^\d+$/.test(`${alias}`) || /\s/.test(`${alias}`)) {
    await interaction.reply(
      "❌ Format de l'alias invalide (pas d'espace autorisé)."
    );
    return;
  }

  const res = await supabase.from("archive").update({ alias }).eq("id", id);

  if (res.status != 204) {
    await interaction.reply(
      "❌ Une erreur s'est produite (<@!677511817085452289>)."
    );
    return;
  }

  // @ts-ignore
  await interaction.reply(`✅ L'alias a été créé !`);
}

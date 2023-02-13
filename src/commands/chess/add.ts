import { ChatInputCommandInteraction, Attachment } from "discord.js";

import { isNull } from "underscore";

import supabase from "../../lib/supabase.js";

export default async function (interaction: ChatInputCommandInteraction) {
  const lien = interaction.options.get("lien", true).value;
  const résultat = interaction.options.get("résultat", true).value;
  const blancs = interaction.options.getUser("blancs", false)?.id || null;
  const noirs = interaction.options.getUser("noirs", false)?.id || null;

  if (!lien) {
    await interaction.reply("❌ Veuillez fournir un pgn valide");
    return;
  }

  let res = await supabase
    .from("chess")
    .insert({ lien, résultat, blancs, noirs })
    .select();

  if (res.status != 201 || isNull(res.data)) {
    await interaction.reply(
      "❌ Une erreur s'est produite (<@!677511817085452289>)."
    );
    return;
  }

  await interaction.reply(
    `✅ La partie a été ajoutée avec l'id **${
      !isNull(res.data) ? res.data[0].id || "❌" : "❌"
    }** !`
  );
}

import { ChatInputCommandInteraction, Attachment } from "discord.js";

import { isNull } from "underscore";

import supabase from "../../lib/supabase.js";

async function repostAttachment(file: Attachment | null, interaction: ChatInputCommandInteraction): Promise<string> {
  if (isNull(file)) return "";

  const backend_channel = interaction.client.channels.cache.get("931558530522177566")
  if (backend_channel?.isTextBased()) {

    const message = await backend_channel.send({
      files: [{
        name: file.name||undefined,
        attachment: file.url
      }]
    })

    return message.attachments.first()?.url || ""
  }

  return "";
}

export default async function (interaction: ChatInputCommandInteraction) {
  const tag = interaction.options.get("tag", true).value;
  const comment = interaction.options.get("commentaire", false)?.value;
  const alias = interaction.options.get("alias", false)?.value;
  
  const fichier = await repostAttachment(interaction.options.getAttachment("fichier", false), interaction);

  if (!comment && !fichier) {
    await interaction.reply("❌ Veuillez fournir au minimum un fichier ou un commentaire.")
    return;
  }

  const res = 
    await supabase.from("archive")
                  .insert({
                    tag,
                    attachment: fichier || null,
                    comment: comment||"",
                    alias: alias||null
                  })
                  .select()

  if (res.status != 201 || isNull(res.data)) {
    await interaction.reply("❌ Une erreur s'est produite (<@!677511817085452289>).")
    return;
  }

  // @ts-ignore
  await interaction.reply(`✅ Le post a été créé avec l'id **${!isNull(res.data) ? res.data[0].id|| "❌" : "❌"}** !`)
}
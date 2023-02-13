import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Post } from "src/lib/posts.js";

import { isNull } from "underscore";
import { send } from "../../lib/posts.js";

import supabase from "../../lib/supabase.js";

export default async function (interaction: CommandInteraction) {
  const ref = interaction.options.get("référence", true).value;

  let post: Post[] | null = null;

  if (isNaN(parseInt(ref?.toString() || "a"))) {
    post = (
      await supabase.from("archive").select("*").eq("alias", ref).limit(1)
    ).data;
  } else {
    post = (await supabase.from("archive").select("*").eq("id", ref).limit(1))
      .data;
  }

  if (isNull(post) || !post) {
    await interaction.reply("❌ Le post n'existe pas.");
    return;
  }

  await send(interaction, post[0]);
}

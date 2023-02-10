import { CommandInteraction } from "discord.js";
import { Post } from "src/lib/posts.js";

import { isNull } from "underscore";
import { send } from "../../lib/posts.js";

import supabase from "../../lib/supabase.js";

export default async function (interaction: CommandInteraction) {
  const tag = interaction.options.get("tag", false)?.value;
  
  let posts: Post[] | null = null;

  if (!tag) {
    posts = (
      await supabase
        .from("archive")
        .select("*")
    ).data;
  } else {
    posts = (
      await supabase
        .from("archive")
        .select("*")
        .eq("tag", tag)
    ).data;
  }

  if (isNull(posts)||!posts) {
    await interaction.reply("❌ Aucun post dans ce tag.");
    return;
  }

  let post = posts[Math.floor(Math.random() * posts.length)]

  await send(interaction, post);
}
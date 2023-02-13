import {
  CommandInteraction,
  Message,
  InteractionResponse,
  InteractionReplyOptions,
} from "discord.js";

import { isNull } from "underscore";

export interface Post extends Object {
  id: number;
  alias: string | null;
  comment: string | null;
  attachment: string | null;
  created_at: string;
}

function formatUnattachedPost(post: Post): InteractionReplyOptions {
  return {
    content:
      `_Post n°${post.id}_, créé le ` +
      new Date(post.created_at).toLocaleDateString("fr-FR", {
        dateStyle: "short",
      }) +
      `\n> ${post.comment}`,
    allowedMentions: { parse: [] },
  };
}

function formatOnlyAttachedPost(post: Post): InteractionReplyOptions {
  return {
    content:
      `_Post n°${post.id}_ , créé le ` +
      new Date(post.created_at).toLocaleDateString("fr-FR", {
        dateStyle: "short",
      }),
    files: [
      {
        attachment: post.attachment || "",
        name: post.attachment?.split("/").reverse()[0],
      },
    ],
    allowedMentions: { parse: [] },
  };
}

function formatFullPost(post: Post): InteractionReplyOptions {
  return {
    content:
      `_Post n°${post.id}_, créé le ` +
      new Date(post.created_at).toLocaleDateString("fr-FR", {
        dateStyle: "short",
      }) +
      `\n> ${post.comment}`,
    files: [
      {
        attachment: post.attachment || "",
        name: post.attachment?.split("/").reverse()[0],
      },
    ],
    allowedMentions: { parse: [] },
  };
}

export async function send(
  interaction: CommandInteraction,
  post: Post
): Promise<InteractionResponse<boolean> | null> {
  try {
    if (isNull(post.attachment)) {
      return await interaction.reply(formatUnattachedPost(post));
    } else if (isNull(post.comment) || !post.comment) {
      return await interaction.reply(formatOnlyAttachedPost(post));
    } else {
      return await interaction.reply(formatFullPost(post));
    }
  } catch (err) {
    return null;
  }
}

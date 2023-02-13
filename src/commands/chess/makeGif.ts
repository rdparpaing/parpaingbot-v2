import { ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";

import { isNull } from "underscore";

import { Chess } from "chess.js";
import pgnParser from "pgn-parser";
import { Gif } from "make-a-gif";
import chessImgGen from "chess-image-generator-ts";

const { parse } = pgnParser;
let chess = new Chess();

var imageGenerator = new chessImgGen({
  size: 720,
  style: "merida",
});

function pgnToFEN(pgn: string): string[] | null {
  chess.reset();

  try {
    let parsed = parse(pgn)[0].moves.map((i) => i.move);
    let fens = [];

    for (let move of parsed) {
      chess.move(move);
      fens.push(chess.fen());
    }

    return fens;
  } catch (err) {
    return null;
  }
}

async function fensToGIF(fens: string[]): Promise<Uint8Array | Buffer> {
  const gif = new Gif(720, 720);

  for (let fen of fens) {
    await imageGenerator.loadFEN(fen);
    await gif.addFrame({ src: await imageGenerator.generateBuffer() });
  }

  return await gif.encode();
}

export default async function (interaction: ChatInputCommandInteraction) {
  let pgn = await interaction.options.get("pgn")?.value;

  let fens = pgnToFEN(`${pgn}`);

  if (!pgn || isNull(fens)) {
    await interaction.reply("❌ Veuillez fournir un PGN valide!");
    return;
  }

  await interaction.deferReply();

  let gif = new AttachmentBuilder(Buffer.from(await fensToGIF(fens)), {
    name: "chess.gif",
  });

  await interaction.editReply({
    files: [gif],
  });
}

import express from "express"

var app = express();

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

function pgnToFEN(pgn) {
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

async function fensToGIF(fens) {
  const gif = new Gif(720, 720);

  for (let fen of fens) {
    await imageGenerator.loadFEN(fen);
    await gif.addFrame({ src: await imageGenerator.generateBuffer() });
  }

  return await gif.encode();
}

app.listen(process.env.PORT || 3000, () => {
 console.log("Server running on port 3000");
});

app.get("/make-gif", async (req, res, next) => {
  try {
    let pgn = req.query["pgn"];
    let fens = pgnToFEN(`${pgn}`);

    if (!pgn || isNull(fens)) throw new Error();

    let gif = await fensToGIF(fens);

    res.send(gif.toString('base64'))
  } catch {
    res.status(400).send("Error")
  }
});


export default async function (interaction) {

  let gif = new AttachmentBuilder(Buffer.from(await fensToGIF(fens)), {
    name: "chess.gif",
  });

  await interaction.editReply({
    files: [gif],
  });
}

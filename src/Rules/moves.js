import { calc } from "./calc.js";

const rookOptionalMove = (chessman, chessID) => {
  const rookMove = chessman.rook.move[0];
  const [col, row] = chessID;
  let optionalMove = [];

  for (let i = rookMove; i < 8; ++i) {
    if (calc(col, i)) {
      optionalMove.push(`${calc(col, i)}${Number(row)}`);
    }
    if (calc(col, -i)) {
      optionalMove.push(`${calc(col, -i)}${Number(row)}`);
    }

    if (Number(row) + i < 9) {
      optionalMove.push(`${col}${Number(row) + i}`);
    }

    if (Number(row) - i > 0) {
      optionalMove.push(`${col}${Number(row) - i}`);
    }
  }

  return optionalMove;
};

const knightOptionalMove = (chessman, chessID) => {
  const knightMoves = chessman.knight.move;
  const [col, row] = chessID;
  let optionalMove = [];

  for (const [colOffset, rowOffset] of knightMoves) {
    optionalMove.push(`${calc(col, colOffset)}${Number(row) + rowOffset}`);
  }
  return optionalMove;
};

const pawnOptionalMove = (chessman, color, chessID) => {
  const move = chessman.pawn.move;
  const [col, row] = chessID;
  let optionalMove;

  if (color === "black") {
    optionalMove = move.map((value) => `${col}${Number(row) + value}`);
  } else if (color === "white") {
    optionalMove = move.map((value) => `${col}${Number(row) - value}`);
  }

  return optionalMove;
};

export { knightOptionalMove, pawnOptionalMove, rookOptionalMove };

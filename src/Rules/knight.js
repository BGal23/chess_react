import { calc } from "./calc.js";

const knightOptionalMove = (chessman, chessID) => {
  //const [moveOne, moveTwo] = chessman.knight.move;
  const knightMoves = chessman.knight.move;
  const [col, row] = chessID;
  let optionalMove = [];

  for (const [colOffset, rowOffset] of knightMoves) {
    optionalMove.push(`${calc(col, colOffset)}${Number(row) + rowOffset}`);
  }

  return optionalMove;
};

const knightMove = (selectFiled, color, selectedChess) => (prev) => {
  const updatePlace = [...prev.knight[color].place];
  let foundChess = updatePlace.indexOf(selectedChess.id);
  updatePlace.splice(foundChess, 1, selectFiled);
  return {
    ...prev,
    knight: {
      ...prev.knight,
      [color]: {
        ...prev.knight[color],
        place: updatePlace,
      },
    },
  };
};

export { knightOptionalMove, knightMove };

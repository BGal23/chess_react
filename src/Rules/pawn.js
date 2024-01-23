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

const pawnMove = (selectFiled, color, selectedChess) => (prev) => {
  const updatePlace = [...prev.pawn[color].place];
  let foundChess = updatePlace.indexOf(selectedChess.id);
  updatePlace.splice(foundChess, 1, selectFiled);
  return {
    ...prev,
    pawn: {
      ...prev.pawn,
      [color]: {
        ...prev.pawn[color],
        place: updatePlace,
      },
    },
  };
};

export { pawnOptionalMove, pawnMove };

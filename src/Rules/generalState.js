const generalState = {
  pawn: {
    black: {
      place: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
      color: "black",
    },
    white: {
      place: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
      color: "white",
    },
    move: [1],
    icon: "♟",
    name: "pawn",
  },
  rook: {
    black: { place: ["A1", "H1"], color: "black" },
    white: { place: ["A8", "H8"], color: "white" },
    move: [1],
    icon: "♜",
    name: "rook",
  },
  bishop: {
    black: { place: ["C1", "F1"], color: "black" },
    white: { place: ["C8", "F8"], color: "white" },
    icon: "♝",
    name: "bishop",
  },
  knight: {
    black: { place: ["B1", "G1"], color: "black" },
    white: { place: ["B8", "G8"], color: "white" },
    move: [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ],
    icon: "♞",
    name: "knight",
  },
  king: {
    black: { place: ["E1"], color: "black" },
    white: { place: ["E8"], color: "white" },
    icon: "♚",
    name: "king",
  },
  queen: {
    black: { place: ["D1"], color: "black" },
    white: { place: ["D8"], color: "white" },
    icon: "♛",
    name: "queen",
  },
};

export { generalState };

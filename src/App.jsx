import Chessboard from "./components/Chessboard/Chessboard";
import Chessman from "./components/Chessman/Chessman";
import scss from "./App.module.scss";
import { useEffect, useState } from "react";

const App = () => {
  const [chessman] = useState({
    pawn: {
      black: {
        place: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
        color: "black",
      },
      white: {
        place: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
        color: "white",
      },
      move: [1, 2],
      icon: "♟",
      name: "pawn",
    },
    rook: {
      black: { place: ["A1", "H1"], color: "black" },
      white: { place: ["A8", "H8"], color: "white" },
      icon: "♜",
      name: "rook",
    },
    bishop: {
      black: { place: ["B1", "G1"], color: "black" },
      white: { place: ["B8", "G8"], color: "white" },
      icon: "♝",
      name: "bishop",
    },
    knight: {
      black: { place: ["C1", "F1"], color: "black" },
      white: { place: ["C8", "F8"], color: "white" },
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
  });

  const [chessboard, setChessboard] = useState([]);
  const [optionalMove, setOptionalMove] = useState([]);
  const [selectedChess, setSelectedChess] = useState("");

  const generateChessboard = () => {
    const horizon = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const vertical = ["8", "7", "6", "5", "4", "3", "2", "1"];

    const newChessboard = [];
    for (const column of vertical) {
      let variant = false;
      if (Number(column) % 2) {
        variant = true;
      }
      const testArray = [];

      for (const row of horizon) {
        testArray.push(row);
        const value = `${row}${column}`;
        let findChessman;
        let colorChessman;
        let filedColor;

        optionalMove.forEach((filed) => {
          if (filed === value) {
            filedColor = filed;
          }
        });

        for (const man in chessman) {
          if (chessman[man].black.place.some((id) => id === value)) {
            findChessman = chessman[man].icon;
            colorChessman = chessman[man].black.color;
          } else if (chessman[man].white.place.some((id) => id === value)) {
            findChessman = chessman[man].icon;
            colorChessman = chessman[man].white.color;
          }
        }

        if (testArray.length % 2) {
          newChessboard.push(
            <Chessboard
              key={value}
              id={value}
              variant={variant ? "white" : "black"}
              move={filedColor === value}
              attack={false}
            >
              {<Chessman variant={colorChessman} chessman={findChessman} />}
            </Chessboard>
          );
        } else {
          newChessboard.push(
            <Chessboard
              key={value}
              id={value}
              variant={!variant ? "white" : "black"}
              move={filedColor === value}
              attack={false}
            >
              {<Chessman variant={colorChessman} chessman={findChessman} />}
            </Chessboard>
          );
        }
      }
    }
    return newChessboard;
  };

  useEffect(() => {
    setChessboard(generateChessboard());
  }, [chessman, optionalMove]);

  const handleEvent = (event) => {
    setSelectedChess(event.target.id);
    const color = event.target.className;
    const man = event.target.innerHTML;
    const [col, row] = event.target.parentElement.id;
    let move;
    console.log(event.target.id);

    switch (man) {
      case "♟": {
        move = chessman.pawn.move;
        let optionalMove;

        if (color.includes("black")) {
          optionalMove = move.map((value) => `${col}${Number(row) + value}`);
        } else if (color.includes("white")) {
          optionalMove = move.map((value) => `${col}${Number(row) - value}`);
        }

        setOptionalMove(optionalMove);

        break;
      }
      case "♜":
        console.log("♜");
        break;
      case "♝":
        console.log("♝");
        break;
      case "♞":
        console.log("♞");
        break;
      case "♚":
        console.log("♚");
        break;
      case "♛":
        console.log("♛");
        break;
      default:
    }
  };

  return (
    <>
      <div onClick={handleEvent} className={scss.chessboard}>
        {chessboard}
      </div>
    </>
  );
};

export default App;

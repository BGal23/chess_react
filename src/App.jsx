import Chessboard from "./components/Chessboard/Chessboard";
import Chessman from "./components/Chessman/Chessman";
import scss from "./App.module.scss";
import {
  rookOptionalMove,
  knightOptionalMove,
  pawnOptionalMove,
} from "./Rules/moves";
import { useEffect, useState } from "react";
import { generalState } from "./Rules/generalState";
import { roundColor } from "./Rules/calc";

const App = () => {
  const [chessman, setChessman] = useState(generalState);
  const [selectedChess, setSelectedChess] = useState({
    id: "",
    chessman: "",
  });

  const [chessboard, setChessboard] = useState([]);
  const [optionalMove, setOptionalMove] = useState([]);
  const [round, setRound] = useState(0);

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
        let filedOptional;
        let filedAttack;

        const checkColor = roundColor(round) === "white" ? "black" : "white";

        optionalMove.some((filed) => {
          if (filed === value) {
            filedOptional = filed;
            Object.keys(chessman).forEach((check) => {
              const opponentPlace = chessman[check][checkColor].place;
              if (opponentPlace.includes(filedOptional)) {
                filedAttack = filedOptional;
              }
            });
            Object.keys(chessman).forEach((check) => {
              const currentColorPlace =
                chessman[check][roundColor(round)].place;

              if (currentColorPlace.includes(filedOptional)) {
                filedOptional = "";
              }
            });
            return true;
          }
          return false;
        });

        let findChessman;
        let colorChessman;

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
              move={filedOptional === value}
              attack={filedAttack === value}
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
              move={filedOptional === value}
              attack={filedAttack === value}
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

  const handleEvent = async (event) => {
    let color = roundColor(round);

    let colorCheck = event.target.className;
    const clickType = event.target.nodeName;
    const man = event.target.innerHTML;
    if (clickType === "SPAN" && colorCheck.includes(color)) {
      const chessID = event.target.parentElement.id;
      setSelectedChess((prev) => ({ ...prev, id: chessID }));
      switch (man) {
        case "♟": {
          setOptionalMove(pawnOptionalMove(chessman, color, chessID));
          break;
        }
        case "♜":
          setOptionalMove(rookOptionalMove(chessman, chessID));
          break;
        case "♝":
          //console.log("♝");
          break;
        case "♞":
          setOptionalMove(knightOptionalMove(chessman, chessID));
          break;
        case "♚":
          //console.log("♚");
          break;
        case "♛":
          //console.log("♛");
          break;
        default:
      }
      setSelectedChess((prev) => ({ ...prev, chessman: man }));
    } else if (clickType === "DIV") {
      const selectFiled = event.target.id;
      if (optionalMove.some((value) => value === selectFiled)) {
        let chess;
        switch (selectedChess.chessman) {
          case "♟":
            chess = "pawn";
            break;

          case "♜":
            chess = "rook";
            //console.log("♜");
            break;
          case "♝":
            chess = "bishop";
            //console.log("♝");
            break;
          case "♞":
            chess = "knight";
            break;
          case "♚":
            chess = "king";
            //console.log("♚");
            break;
          case "♛":
            chess = "queen";
            //console.log("♛");
            break;
          default:
        }

        setOptionalMove([]);
        setChessman((prev) => {
          const updatePlace = [...prev[chess][color].place];
          let foundChess = updatePlace.indexOf(selectedChess.id);
          updatePlace.splice(foundChess, 1, selectFiled);
          return {
            ...prev,
            [chess]: {
              ...prev[chess],
              [color]: {
                ...prev[chess][color],
                place: updatePlace,
              },
            },
          };
        });
        setRound((prev) => prev + 1);
      }
    }
  };

  return (
    <div onClick={handleEvent} className={scss.chessboard}>
      {chessboard}
    </div>
  );
};

export default App;

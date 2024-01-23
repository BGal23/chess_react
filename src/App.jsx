import Chessboard from "./components/Chessboard/Chessboard";
import Chessman from "./components/Chessman/Chessman";
import scss from "./App.module.scss";
import { pawnOptionalMove, pawnMove } from "./Rules/pawn";
import { knightOptionalMove, knightMove } from "./Rules/knight";
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
        let findChessman;
        let colorChessman;
        let filedColor;

        optionalMove.forEach((filed) => {
          if (filed === value) {
            filedColor = filed;

            for (const check in chessman) {
              chessman[check][roundColor(round)].place.forEach((value) => {
                if (filedColor === value) {
                  filedColor = "";
                }
              });
            }
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
          //console.log("♜");
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
        switch (selectedChess.chessman) {
          case "♟":
            setChessman(pawnMove(selectFiled, color, selectedChess));
            break;

          case "♜":
            //console.log("♜");
            break;
          case "♝":
            //console.log("♝");
            break;
          case "♞":
            setChessman(knightMove(selectFiled, color, selectedChess));
            break;
          case "♚":
            //console.log("♚");
            break;
          case "♛":
            //console.log("♛");
            break;
          default:
        }
        setOptionalMove([]);
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

import React from "react";
import Node from "../components/node";
import "../styles/game.css";
import { useState } from "react/cjs/react.development";
import { onHover } from "../animationVariants/animationVariants";
import { motion } from "framer-motion";

const createGrid = () => {
  const grid = [];

  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 10; col++) {
      const currentNode = createNode(row, col);
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    col,
    row,
    isFilled: false,
    isHit: false,
    missed: false,
    isPlayersBoard: false,
    shipType: "",
    shipId: 0,
    direction: "",
  };
};

const clearGrid = () => {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      document.getElementById(`node-${row}-${col}-${true}`).className = "node";
      document.getElementById(`node-${row}-${col}-${false}`).className = "node";
    }
  }
};

const Replay = ({ replay }) => {
  const [gridPlayer, setGridPlayer] = useState(createGrid());
  const [gridOpponent, setGridOpponent] = useState(createGrid());
  const [areShipsShown, setAreShipsShown] = useState(false);
  const [replayAgain, setReplayAgain] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const animateAiAlgorithm = (hits) => {
    document
      .getElementById("replayButton")
      .setAttribute("disabled", "disabled");

    document
      .getElementById("showHideShipsButton")
      .setAttribute("disabled", "disabled");

    for (let i = 0; i < hits.length; i++) {
      setTimeout(() => {
        switch (hits[i][2]) {
          case "player":
            if (hits[i][3] === 1) {
              document.getElementById(
                `node-${hits[i][0]}-${hits[i][1]}-${true}`
              ).className = "node node-hit";
              if (hits[i][4] === 1) {
                document.getElementById("showSunkenShip").innerHTML =
                  "The left computer's " + hits[i][5] + " was sunk";
              }
            } else {
              document.getElementById(
                `node-${hits[i][0]}-${hits[i][1]}-${true}`
              ).className = "node node-missed";
            }
            break;
          case "opponent":
            if (hits[i][3] === 1) {
              document.getElementById(
                `node-${hits[i][0]}-${hits[i][1]}-${false}`
              ).className = "node node-hit";
              if (hits[i][4] === 1) {
                document.getElementById("showSunkenShip").innerHTML =
                  "The right computer's " + hits[i][5] + " was sunk";
              }
            } else {
              document.getElementById(
                `node-${hits[i][0]}-${hits[i][1]}-${false}`
              ).className = "node node-missed";
            }
            break;

          default:
            break;
        }
        if (i === hits.length - 1) {
          showTheWinner(hits);
          document.getElementById("replayButton").removeAttribute("disabled");
          document.getElementById("replayButton").innerHTML = "Reset";
        }
      }, 50 * i);
    }
  };

  const showTheWinner = (hits) => {
    let winner;
    if (hits[hits.length - 1][2] == "player") {
      winner = "right computer";
    } else {
      winner = "left computer";
    }
    document.getElementById("showSunkenShip").innerHTML =
      "The " + winner + " won";
  };

  return (
    <>
      <h5 className="whoseTurn">Replay!</h5>
      <div className="gameBoard">
        <div className="gridPlayer">
          {gridPlayer.map((row, rowIdx) => {
            return (
              <div className="gridRowAI" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    col,
                    row,
                    isFilled,
                    isHit,
                    missed,
                    shipId,
                    shipType,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFilled={isFilled}
                      isHit={isHit}
                      missed={missed}
                      isPlayersBoard={true}
                      shipId={shipId}
                      shipType={shipType}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="gridOpponent">
          {gridOpponent.map((row, rowIdx) => {
            return (
              <div className="gridRowAI" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    col,
                    row,
                    isFilled,
                    isHit,
                    missed,
                    shipId,
                    shipType,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFilled={isFilled}
                      isHit={isHit}
                      missed={missed}
                      isPlayersBoard={false}
                      shipId={shipId}
                      shipType={shipType}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <motion.button
        id="showHideShipsButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        onClick={() => {
          console.log(replay);
          if (!areShipsShown) {
            clearGrid();
            document.getElementById("showSunkenShip").innerHTML = "";
            document.getElementById("showHideShipsButton").innerHTML =
              "Hide ships!";
            setGridPlayer(replay[1][1]);
            setGridOpponent(replay[1][2]);
            setAreShipsShown(true);
          } else {
            clearGrid();
            document.getElementById("showHideShipsButton").innerHTML =
              "Show ships!";
            setGridPlayer(createGrid());
            setGridOpponent(createGrid());
            setAreShipsShown(false);
          }
        }}
      >
        Show ships!
      </motion.button>
      <motion.button
        id="replayButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        onClick={() => {
          if (replayAgain && areShipsShown && isResetOpen) {
            setIsResetOpen(false);
            clearGrid();
            setGridPlayer(createGrid());
            setGridOpponent(createGrid());
            setAreShipsShown(false);
            document.getElementById("showSunkenShip").innerHTML = "";
            document.getElementById("replayButton").innerHTML = "Replay again!";
            document.getElementById("showHideShipsButton").innerHTML =
              "Show ships!";
            document
              .getElementById("showHideShipsButton")
              .removeAttribute("disabled");
          } else if (!areShipsShown) {
            clearGrid();
            setGridPlayer(createGrid());
            setGridOpponent(createGrid());
            setIsResetOpen(false);
            document.getElementById("replayButton").innerHTML = "Replay again!";
            document
              .getElementById("showHideShipsButton")
              .removeAttribute("disabled");
          }
          if (!isResetOpen) {
            document.getElementById("showSunkenShip").innerHTML = "";
            animateAiAlgorithm(replay[1][0]);
            setReplayAgain(true);
            setIsResetOpen(true);
          }
        }}
      >
        Replay!
      </motion.button>
      <div id="showSunkenShip"></div>
    </>
  );
};

export default Replay;

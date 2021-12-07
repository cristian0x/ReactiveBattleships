import React from "react";
import Node from "../components/node";
import "../styles/game.css";
import { automaticShipLayout } from "../functions/automaticShipLayout.js";
import { aiAlgorithm } from "../functions/aiAlgorithm";
import { useState } from "react/cjs/react.development";

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

const resetShipLayout = () => {
  clearGrid();
  const initialGrid = createGrid();
  return initialGrid;
};

function isInArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length) return true;
    }
  }
  return false;
}

const Game = () => {
  const [gridPlayer, setGridPlayer] = useState(createGrid());
  const [gridOpponent, setGridOpponent] = useState(createGrid());
  const [areGridsFilled, setAreGridsFilled] = useState(false);
  const [playerFilledCells, setPlayerFilledCells] = useState([]);
  const [opponentFilledCells, setOpponentFilledCells] = useState([]);
  const [disable, setDisable] = useState(false);
  const [difficultyLevelForPlayer, setDifficultyLevelForPlayer] = useState("");
  const [difficultyLevelForOpponent, setDifficultyLevelForOpponent] =
    useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const visualizeAutomaticShipLayout = () => {
    let dataFromAutomaticShipLayout = automaticShipLayout(resetShipLayout());
    return dataFromAutomaticShipLayout;
  };

  const visualizeAiAlgorithm = () => {
    let dataFromAiAlgorithm = aiAlgorithm(
      gridPlayer,
      gridOpponent,
      playerFilledCells,
      opponentFilledCells,
      difficultyLevelForPlayer,
      difficultyLevelForOpponent
    );
    let newGrid = dataFromAiAlgorithm;
    return newGrid;
  };

  const animateAiAlgorithm = (
    nodesHitInOrderForPlayer,
    nodesHitInOrderForOpponent,
    shipHitPlayer,
    shipHitOpponent,
    didPlayerHit,
    didOpponentHit,
    hits
  ) => {
    var hitCount =
      nodesHitInOrderForPlayer.length < nodesHitInOrderForOpponent.length
        ? nodesHitInOrderForPlayer.length
        : nodesHitInOrderForOpponent.length;

    console.log(hits);

    for (let i = 0; i < hits.length; i++) {
      setTimeout(() => {
        switch (hits[i][2]) {
          case "player":
            if (hits[i][3] === 1) {
              document.getElementById(
                `node-${hits[i][0]}-${hits[i][1]}-${true}`
              ).className = "node node-hit";
              if (hits[i][4] === 1) {
                console.log("The player's " + hits[i][5] + " was sunk");
                //document.getElementsByClassName("showSunkenShip").innerHTML =
                //"The player's " + hits[i][5] + " was sunk";
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
                console.log("The opponent's " + hits[i][5] + " was sunk");
                //document.getElementsByClassName("showSunkenShip").innerHTML =
                //"The opponent's " + hits[i][5] + " was sunk";
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
      }, 700 * i); // 700
    }

    /*
    for (let i = 0; i < hitCount; i++) {
      console.log(i);
      let itemPlayer = [
        nodesHitInOrderForPlayer[i][0],
        nodesHitInOrderForPlayer[i][1],
      ];
      let itemOpponent = [
        nodesHitInOrderForOpponent[i][0],
        nodesHitInOrderForOpponent[i][1],
      ];

      if (i === 0) {
        if (isInArray(shipHitOpponent, itemOpponent)) {
          document.getElementById(
            `node-${nodesHitInOrderForOpponent[i][0]}-${
              nodesHitInOrderForOpponent[i][1]
            }-${false}`
          ).className = "node node-hit";
        } else {
          document.getElementById(
            `node-${nodesHitInOrderForOpponent[i][0]}-${
              nodesHitInOrderForOpponent[i][1]
            }-${false}`
          ).className = "node node-missed";
        }
      } else {
        var count = 0;
        setTimeout(() => {
          for (let k = i; k < didPlayerHit.length; k++) {
            if (didPlayerHit[k] == 1) count++;
            else break;
          }
          for (let k = 0; k <= count; k++) {
            if (isInArray(shipHitPlayer, itemPlayer)) {
              document.getElementById(
                `node-${nodesHitInOrderForPlayer[i + k][0]}-${
                  nodesHitInOrderForPlayer[i + k][1]
                }-${true}`
              ).className = "node node-hit";
            } else {
              document.getElementById(
                `node-${nodesHitInOrderForPlayer[i + k][0]}-${
                  nodesHitInOrderForPlayer[i + k][1]
                }-${true}`
              ).className = "node node-missed";
            }
          }

          setTimeout(() => {
            if (isInArray(shipHitOpponent, itemOpponent)) {
              document.getElementById(
                `node-${nodesHitInOrderForOpponent[i][0]}-${
                  nodesHitInOrderForOpponent[i][1]
                }-${false}`
              ).className = "node node-hit";
            } else {
              document.getElementById(
                `node-${nodesHitInOrderForOpponent[i][0]}-${
                  nodesHitInOrderForOpponent[i][1]
                }-${false}`
              ).className = "node node-missed";
            }
          }, 300 * i); // 300
        }, 2500 * i); // 2500
      }
    }*/
  };

  const handleDifficultyChangeForPlayer = (e) => {
    setDifficultyLevelForPlayer(e.target.value);
  };

  const handleDifficultyChangeForOpponent = (e) => {
    setDifficultyLevelForOpponent(e.target.value);
  };

  return (
    <>
      <h5 className="whoseTurn">Computers Battle!</h5>
      <div className="gameBoard">
        <div className="gridPlayer">
          {gridPlayer.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
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
              <div key={rowIdx}>
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
      <select
        name="selectDifficultyForComputer1"
        id="selectDifficultyForComputer1"
        onChange={handleDifficultyChangeForPlayer}
      >
        <option value="" defaultValue>
          Please select difficulty
        </option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <select
        name="selectDifficultyForComputer2"
        id="selectDifficultyForComputer2"
        onChange={handleDifficultyChangeForOpponent}
      >
        <option value="" defaultValue>
          Please select difficulty
        </option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <button
        disabled={disable}
        onClick={() => {
          setGridPlayer(resetShipLayout());
          setPlayerFilledCells([]);
          setGridOpponent(resetShipLayout());
          setOpponentFilledCells([]);
          setAreGridsFilled(false);

          let dataFromAutomaticShipLayoutForPlayer =
            visualizeAutomaticShipLayout();
          setGridPlayer(dataFromAutomaticShipLayoutForPlayer[0].slice());
          setPlayerFilledCells(dataFromAutomaticShipLayoutForPlayer[1]);

          let dataFromAutomaticShipLayoutForOpponent =
            visualizeAutomaticShipLayout();
          setGridOpponent(dataFromAutomaticShipLayoutForOpponent[0].slice());
          setOpponentFilledCells(dataFromAutomaticShipLayoutForOpponent[1]);

          setAreGridsFilled(true);
          setDisable(true);
        }}
      >
        Generate ships
      </button>
      <button
        onClick={() => {
          setDisable(false);
          setGridPlayer(resetShipLayout());
          setPlayerFilledCells([]);
          setGridOpponent(resetShipLayout());
          setOpponentFilledCells([]);
          setAreGridsFilled(false);
        }}
      >
        Reset ships
      </button>
      <button
        onClick={() => {
          if (
            !areGridsFilled ||
            difficultyLevelForPlayer.length === 0 ||
            difficultyLevelForOpponent.length === 0
          ) {
            console.log(
              "Grids are empty or the difficulty level is not chosen!"
            );
          } else {
            //animateAiAlgorithm();
            let dataFromAiAlgorithm = visualizeAiAlgorithm();
            //setGridPlayer(dataFromAiAlgorithm[0].slice());
            //setGridOpponent(dataFromAiAlgorithm[1].slice());
            //setDisable(true);

            animateAiAlgorithm(
              dataFromAiAlgorithm[2],
              dataFromAiAlgorithm[3],
              dataFromAiAlgorithm[4],
              dataFromAiAlgorithm[5],
              dataFromAiAlgorithm[6],
              dataFromAiAlgorithm[7],
              dataFromAiAlgorithm[8]
            );
          }
        }}
      >
        Start a game!
      </button>
      <div className="showSunkenShip"></div>
    </>
  );
};

export default Game;

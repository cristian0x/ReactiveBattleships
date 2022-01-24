import React from "react";
import Node from "../components/Node";
import "../styles/game.css";
import { automaticShipLayout } from "../functions/automaticShipLayout.js";
import { aiAlgorithm } from "../functions/aiAlgorithm";
import { useState } from "react/cjs/react.development";
import { onHover } from "../animationVariants/animationVariants";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

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

const ComputersBattle = () => {
  const [gridPlayer, setGridPlayer] = useState(createGrid());
  const [gridOpponent, setGridOpponent] = useState(createGrid());
  const [areGridsFilled, setAreGridsFilled] = useState(false);
  const [playerFilledCells, setPlayerFilledCells] = useState([]);
  const [opponentFilledCells, setOpponentFilledCells] = useState([]);
  const [disable, setDisable] = useState(false);
  const [difficultyLevelForPlayer, setDifficultyLevelForPlayer] = useState("");
  const [difficultyLevelForOpponent, setDifficultyLevelForOpponent] =
    useState("");

  const [isVisible, setIsVisible] = useState(false)
  const history = useHistory()

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

  const animateAiAlgorithm = (hits) => {
    console.log(hits)

    document
      .getElementById("resetShipsButton")
      .setAttribute("disabled", "disabled");

    document
      .getElementById("startGameButton")
      .setAttribute("disabled", "disabled");

    for (let i = 0; i < hits.length; i++) {
      let timeout = setTimeout(() => {
        if (!(window.location.href === "http://localhost:3000/game")) {
          clearTimeout(timeout);
          window.location.reload();
          return;
        }

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
          document
            .getElementById("resetShipsButton")
            .removeAttribute("disabled");
        }
      }, 700 * i);
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

    setIsVisible(true)
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
      <select
        name="selectDifficultyForComputer2"
        id="selectDifficultyForComputer2"
        onChange={handleDifficultyChangeForOpponent}
        disabled={disable}
      >
        <option value="" defaultValue>
          Please select difficulty
        </option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <select
        name="selectDifficultyForComputer1"
        id="selectDifficultyForComputer1"
        onChange={handleDifficultyChangeForPlayer}
        disabled={disable}
      >
        <option value="" defaultValue>
          Please select difficulty
        </option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <motion.button
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
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
      </motion.button>
      <motion.button
        id="resetShipsButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        onClick={() => {
          setDisable(false);
          setGridPlayer(resetShipLayout());
          setPlayerFilledCells([]);
          setGridOpponent(resetShipLayout());
          setOpponentFilledCells([]);
          setAreGridsFilled(false);
          document
            .getElementById("startGameButton")
            .removeAttribute("disabled");
        }}
      >
        Reset ships
      </motion.button>
      <motion.button
        id="startGameButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        onClick={() => {
          if (
            !areGridsFilled ||
            difficultyLevelForPlayer.length === 0 ||
            difficultyLevelForOpponent.length === 0
          ) {
            document.getElementById("showSunkenShip").innerHTML =
              "Grids are empty or the difficulty level is not chosen!";
          } else {
            document.getElementById("showSunkenShip").innerHTML = "";
            let dataFromAiAlgorithm = visualizeAiAlgorithm();
            animateAiAlgorithm(dataFromAiAlgorithm[8]);
          }
        }}
      >
        Start a game!
      </motion.button>
      {isVisible && <motion.button
        id="startGameButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        onClick={() => {
          history.push("/")
        }}
      >
        Save game
      </motion.button> }
      <div id="showSunkenShip"></div>
    </>
  );
};

export default ComputersBattle;

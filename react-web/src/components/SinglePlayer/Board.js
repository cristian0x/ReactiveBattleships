import React, { useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { onHover, pageSwitch } from "../../animationVariants/animationVariants";
import { placeShips } from "../../functions/HotSeat/placeShips";
import Node from "../Node";
import { handleGameStart } from "../../functions/SinglePlayer/handleGameStart";
import { roundCycle } from "../../functions/SinglePlayer/roundCycle";

const Board = ({
  whoseTurn,
  isExpanded,
  setIsExpanded,
  setIsPlayerPlacingShips,
  shipLength,
  shipsDirection,
  refreshPage,
  setIsBoardVisible,
  aiGrid,
  setAiGrid,
  aiMovesInOrder,
  setAiMovesInOrder,
  hasAlreadyMoved,
  setHasAlreadyMoved,
  hasGameEnded,
  setHasGameEnded,
}) => {
  const [lastShipID, setLastShipID] = useCycle(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [aiDifficulty, setAiDifficulty] = useState("");
  const [aiIterator, setAiIterator] = useState(0);

  const [aiBoard, setAiBoard] = useState(aiGrid[0])

  const resetAiLayout = () => {
    if (aiIterator) return;
    let aiGridCopy = aiGrid;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        aiGridCopy[0][i][j].missed = false;
        aiGridCopy[0][i][j].isHit = false;
      }
    }
    setAiGrid(aiGridCopy);
    setAiBoard(aiGridCopy[0])
  };

  function handleDifficultyChange(e) {
    e.preventDefault();
    setAiDifficulty(e.target.value);
  }

  return (
    <AnimatePresence>
      <motion.div
        className="gameDiv"
        initial={pageSwitch.hidden}
        animate={pageSwitch.visible}
        transition={pageSwitch.transition}
        exit={pageSwitch.hidden}
      >
        <h1>{whoseTurn[0]}</h1>
        {!whoseTurn[5][0] ? (
          <h1> Place your ships </h1>
        ) : (
          <h1> Make your move </h1>
        )}
        <div className="gameBoard">
          <div className="gridPlayer">
            <h3> Your ships </h3>
            {whoseTurn[1].map((currentRow, rowIndex) => (
              <div className="gridRow" key={rowIndex}>
                {currentRow.map((currentNode, nodeIndex) => (
                  <div
                    className="invisibleNode"
                    onClick={() => {
                      placeShips(
                        rowIndex,
                        nodeIndex,
                        whoseTurn[1],
                        whoseTurn[2],
                        shipLength,
                        shipsDirection[1],
                        lastShipID,
                        setLastShipID,
                        refreshPage,
                        whoseTurn[7],
                        whoseTurn[8],
                        whoseTurn[5],
                        whoseTurn[6],
                        setIsBoardVisible
                      )
                    }

                    }
                  >
                    <Node
                      key={nodeIndex}
                      col={currentNode.col}
                      row={currentNode.row}
                      isFilled={currentNode.isFilled}
                      isHit={currentNode.isHit}
                      missed={currentNode.missed}
                      isPlayersBoard={true}
                      shipId={currentNode.shipId}
                      shipType={currentNode.shipType}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="gridPlayer">
            <h3> Shooting board </h3>
            {whoseTurn[3].map((currentRow, rowIndex) => (
              <div className="gridRow" key={rowIndex}>
                {currentRow.map((currentNode, nodeIndex) => (
                  <div
                    className="invisibleNode"
                    onClick={() => {
                      if (!aiIterator) {
                        resetAiLayout()
                      }
                      roundCycle(
                        rowIndex,
                        nodeIndex,
                        whoseTurn[1],
                        whoseTurn[2],
                        whoseTurn[3],
                        whoseTurn[4],
                        aiBoard,
                        setAiBoard,
                        aiMovesInOrder,
                        aiIterator,
                        setAiIterator,
                        refreshPage,
                        whoseTurn[5],
                        hasAlreadyMoved,
                        setHasAlreadyMoved,
                        hasGameEnded,
                        setHasGameEnded,
                        whoseTurn[0]
                      );
                    }}
                  >
                    <Node
                      key={nodeIndex}
                      col={currentNode.col}
                      row={currentNode.row}
                      isFilled={currentNode.isFilled}
                      isHit={currentNode.isHit}
                      missed={currentNode.missed}
                      isPlayersBoard={true}
                      shipId={currentNode.shipId}
                      shipType={currentNode.shipType}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {!whoseTurn[5][0] ? (
          <>
            {!isExpanded ? (
              <motion.button
                className="button"
                onClick={() => {
                  setIsPlayerPlacingShips(true);
                  setIsExpanded();
                }}
                whileHover={onHover.hover}
                onTap={{ scale: 0.9 }}
              >
                Start placing ships
              </motion.button>
            ) : (
              <motion.button
                className="button"
                onClick={() => setIsExpanded()}
                whileHover={onHover.hover}
                onTap={{ scale: 0.9 }}
              >
                Hide menu
              </motion.button>
            )}
          </>
        ) : (
          <>
            {" "}
            {!hasGameStarted && (
              <>
                <select onChange={handleDifficultyChange}>
                  <option value="" defaultValue>
                    Please select difficulty
                  </option>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
                <motion.button
                  className="button"
                  disabled={!aiDifficulty}
                  onClick={() => {
                    handleGameStart(
                      setIsExpanded,
                      setHasGameStarted,
                      whoseTurn[1],
                      whoseTurn[13],
                      whoseTurn[14],
                      aiDifficulty,
                      aiGrid,
                      setAiGrid,
                      aiMovesInOrder,
                      setAiMovesInOrder
                    );
                  }}
                  whileHover={onHover.hover}
                  onTap={{ scale: 0.9 }}
                >
                  Start game
                </motion.button>
              </>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Board;

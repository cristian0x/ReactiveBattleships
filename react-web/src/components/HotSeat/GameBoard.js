import React, { useState } from "react";
import Node from "../node";
import { useCycle } from "framer-motion";
import { playerMove } from "../../functions/HotSeat/playerMove";
import { placeShips } from "../../functions/HotSeat/placeShips";
import { motion, AnimatePresence } from "framer-motion";
import { onHover, pageSwitch } from "../../animationVariants/animationVariants";

const GameBoard = ({
  whoseTurn,
  setIsBoardVisible,
  shipLength,
  setIsPlayerPlacingShips,
  shipsDirection,
  refreshPage,
  hasAlreadyMoved,
  setHasAlreadyMoved,
  hasGameEnded,
  setHasGameEnded,
  setGameMovesInOrder,
  isExpanded,
  setIsExpanded,
}) => {
  const [lastShipID, setLastShipID] = useCycle(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

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
                    onClick={() =>
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
                      playerMove(
                        rowIndex,
                        nodeIndex,
                        whoseTurn[1],
                        whoseTurn[3],
                        whoseTurn[4],
                        whoseTurn[9],
                        whoseTurn[10],
                        refreshPage,
                        setIsBoardVisible,
                        whoseTurn[5],
                        hasAlreadyMoved,
                        setHasAlreadyMoved,
                        hasGameEnded,
                        setHasGameEnded,
                        whoseTurn[0],
                        whoseTurn[11],
                        whoseTurn[12],
                        whoseTurn[13],
                        whoseTurn[14],
                        setGameMovesInOrder
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
        {!whoseTurn[5][0] && (
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
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GameBoard;

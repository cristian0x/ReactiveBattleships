import React, { useState } from "react";
import { AnimatePresence, useCycle } from "framer-motion";
import { menuExpand } from "../../AnimationVariants/animationVariants";
import { motion } from "framer-motion";

const ShipsMenuExpanded = ({
  setShipLength,
  isPlayerPlacingShips,
  shipsDirection,
  setShipsDirection,
  whoseTurn,
  setIsExpanded,
}) => {
  const setPlacedShipLength = (length) => {
    if (!isPlayerPlacingShips) return;
    if (whoseTurn[7][length - 1][1] < 1) return;
    setShipLength(length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="shipsMenuExpanded"
        initial={menuExpand.hidden}
        animate={menuExpand.visible}
        transition={menuExpand.transition}
        exit={menuExpand.hidden}
      >
        <div className="row">
          <h3 onClick={() => setIsExpanded()}> {"<-"} </h3>
          <h3> Place your ships </h3>
        </div>
        {shipsDirection[0] ? (
          <div>
            <div className="row" onClick={() => setPlacedShipLength(4)}>
              <h1> {"oooo x" + whoseTurn[7][3][1]} </h1>
            </div>
            <div className="row" onClick={() => setPlacedShipLength(3)}>
              <h1> {"ooo x" + whoseTurn[7][2][1]} </h1>
            </div>
            <div className="row" onClick={() => setPlacedShipLength(2)}>
              <h1> {"oo x" + whoseTurn[7][1][1]} </h1>
            </div>
            <div className="row" onClick={() => setPlacedShipLength(1)}>
              <h1> {"o x" + whoseTurn[7][0][1]} </h1>
            </div>{" "}
          </div>
        ) : (
          <div>
            {" "}
            <div className="column" onClick={() => setPlacedShipLength(4)}>
              <h1> o </h1>
              <h1> o </h1>
              <h1> o </h1>
              <h1> o </h1>
              <h1> {" x " + whoseTurn[7][3][1]} </h1>
            </div>
            <div className="column" onClick={() => setPlacedShipLength(3)}>
              <h1> o </h1>
              <h1> o </h1>
              <h1> o </h1>
              <h1> {" x " + whoseTurn[7][2][1]} </h1>
            </div>
            <div className="column" onClick={() => setPlacedShipLength(2)}>
              <h1> o </h1>
              <h1> o </h1>
              <h1> {" x " + whoseTurn[7][1][1]} </h1>
            </div>
            <div className="column" onClick={() => setPlacedShipLength(1)}>
              <h1> o </h1>
              <h1> {" x " + whoseTurn[7][0][1]} </h1>
            </div>{" "}
          </div>
        )}
        <h2> {"Current rotation: " + shipsDirection[1]} </h2>
        <button
          className="rotateButton"
          onClick={() => {
            setShipsDirection();
          }}
        >
          {" "}
          Rotate ships{" "}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShipsMenuExpanded;

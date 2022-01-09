import React from "react";
import {onHover, pageSwitch} from "../../AnimationVariants/animationVariants";
import { motion, AnimatePresence } from "framer-motion";

const PlayerChange = ({
  whoseTurn,
  setWhoseTurn,
  setIsBoardVisible,
  setHasAlreadyMoved,
}) => {
  const changePlayer = () => {
    setWhoseTurn();
    setIsBoardVisible();
    setHasAlreadyMoved();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="gameDiv center"
        initial={pageSwitch.hidden}
        animate={pageSwitch.visible}
        transition={pageSwitch.transition}
        exit={pageSwitch.hidden}
      >
        <h1> {"Current player: " + whoseTurn[0]} </h1>
        <motion.button className="button" onClick={() => changePlayer()} whileHover={onHover.hover}
                onTap={{ scale: 0.9 }}>
          {" "}
          Next player{" "}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerChange;

import React from "react";
import Replay from "./replay";
import { motion } from "framer-motion";
import { onHover } from "../animationVariants/animationVariants";

const savedSeaBattles = () => {
  return (
    <div>
      <motion.button
        id="showHideShipsButton"
        className="rotateButton"
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
        style={{ margin: 200, fontSize: 40 }}
      >
        <a href="/replay" style={{ color: "white" }}>
          Saved Game, click me
        </a>
      </motion.button>
    </div>
  );
};

export default savedSeaBattles;

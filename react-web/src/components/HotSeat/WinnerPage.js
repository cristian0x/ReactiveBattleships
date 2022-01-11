import React from "react";
import { onHover, pageSwitch } from "../../animationVariants/animationVariants";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import {saveGame} from "../../services/saveGame";

const WinnerPage = ({ hasGameEnded, gameMovesInOrder }) => {
  const history = useHistory();

  const axios = require("axios")

  async function handlePostGame(e) {
    e.preventDefault()
    await saveGame(gameMovesInOrder)
  }

  return (
    <motion.div
      className="mainContainer"
      initial={pageSwitch.hidden}
      animate={pageSwitch.visible}
      transition={pageSwitch.transition}
    >
      <h1> {"Winer is: " + hasGameEnded[1]} </h1>
      <motion.button
        className="button"
        onClick={() => history.push("/menu")}
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
      >
        Go back to main menu
      </motion.button>
      <motion.button
        className="button"
        onClick={(e) => handlePostGame(e)}
        whileHover={onHover.hover}
        onTap={{ scale: 0.9 }}
      >
        Save battle
      </motion.button>
    </motion.div>
  );
};

export default WinnerPage;

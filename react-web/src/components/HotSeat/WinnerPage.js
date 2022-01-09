import React from "react";
import { onHover, pageSwitch } from "../../AnimationVariants/animationVariants";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const WinnerPage = ({ hasGameEnded }) => {
  const history = useHistory();

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
    </motion.div>
  );
};

export default WinnerPage;

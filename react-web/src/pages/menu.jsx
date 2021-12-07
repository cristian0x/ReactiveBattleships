import React from "react";
import "../styles/menu.css";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const Menu = () => {
  let history = useHistory();

  const titleVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1
    },
    transition: {
      duration: 2
    }
  }

  const leftBoxVariants = {
    hidden: {
      x: -2000
    },
    visible: {
      x: 0
    },
    transition: {
      type: "spring",
      duration: 1.5,
      delay: 2,
    }
  }

  const rightBoxVariants = {
    hidden: {
      x: 2000
    },
    visible: {
      x: 0
    },
    transition: {
      type: "spring",
      duration: 1.5,
      delay: 2
    }
  }

  const onHover = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        yoyo: Infinity,
        duration: 0.4
      }
    }
  }

  return (
    <div className="mainContainer">
      <motion.h5 className="battleshipsText"
                 initial={titleVariants.hidden}
                 animate={titleVariants.visible}
                 transition={titleVariants.transition}
      >
        Battleships</motion.h5>
      <motion.div
        className="chooseMode"
        onClick={() => {
          history.push("/game");
        }}
        initial = {leftBoxVariants.hidden}
        animate = {leftBoxVariants.visible}
        transition = {leftBoxVariants.transition}
        whileHover = {onHover.hover}
        onTap = {{scale: 0.9}}
      >
        <h5 className="chooseModeText">Computers Battle</h5>
      </motion.div>
      <motion.div className="chooseMode"
                  initial = {rightBoxVariants.hidden}
                  animate = {rightBoxVariants.visible}
                  transition = {rightBoxVariants.transition}
                  whileHover = {onHover.hover}
                  onTap = {{scale: 0.9}}
      >
        <h5 className="chooseModeText">Single player</h5>
      </motion.div>
      <motion.div className="chooseMode"
                  initial = {leftBoxVariants.hidden}
                  animate = {leftBoxVariants.visible}
                  transition = {leftBoxVariants.transition}
                  whileHover = {onHover.hover}
                  onTap = {{scale: 0.9}}
      >
        <h5 className="chooseModeText">Hot Seat</h5>
      </motion.div>
      <motion.div className="chooseMode"
                  initial = {rightBoxVariants.hidden}
                  animate = {rightBoxVariants.visible}
                  transition = {rightBoxVariants.transition}
                  whileHover = {onHover.hover}
      >
        <h5 className="chooseModeText">Leaderboard</h5>
      </motion.div>
      <motion.div className="chooseMode"
                  initial = {leftBoxVariants.hidden}
                  animate = {leftBoxVariants.visible}
                  transition = {leftBoxVariants.transition}
                  whileHover = {onHover.hover}
                  onTap = {{scale: 0.9}}
      >
        <h5 className="chooseModeText">Saved sea battles</h5>
      </motion.div>
    </div>
  );
};

export default Menu;

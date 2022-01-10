import React, { useState } from "react";
import "../styles/menu.css";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import {
  titleVariants,
  leftBoxVariants,
  rightBoxVariants,
  onHover,
} from "../AnimationVariants/animationVariants";
import Login from "./login";

const Menu = () => {
  let history = useHistory();

  const [player1Data, setPlayer1Data] = useState([{}, false]);
  const [player2Data, setPlayer2Data] = useState([{}, false]);

  return (
    <div className="mainContainer">
      <Login setPlayerData={setPlayer1Data} playerData={player1Data}/>
      <div className="column">
        <motion.h5
          className="battleshipsText"
          initial={titleVariants.hidden}
          animate={titleVariants.visible}
          transition={titleVariants.transition}
        >
          Battleships
        </motion.h5>
        <motion.div
          className="chooseMode"
          onClick={() => {
            history.push("/game");
          }}
          initial={leftBoxVariants.hidden}
          animate={leftBoxVariants.visible}
          transition={leftBoxVariants.transition}
          whileHover={onHover.hover}
          onTap={{ scale: 0.9 }}
        >
          <h5 className="chooseModeText">Computers Battle</h5>
        </motion.div>

        <motion.div
          className="chooseMode"
          initial={rightBoxVariants.hidden}
          animate={rightBoxVariants.visible}
          transition={rightBoxVariants.transition}
          whileHover={onHover.hover}
          onTap={{ scale: 0.9 }}
        >
          <h5 className="chooseModeText">Single player</h5>
        </motion.div>

        <motion.div
          className="chooseMode"
          onClick={() => {
            if (!player2Data[0].login || !player1Data[0].login) {
              alert("You have to log in on both accounts to play");
              return;
            }
            history.push("/hot-seat");
          }}
          initial={leftBoxVariants.hidden}
          animate={leftBoxVariants.visible}
          transition={leftBoxVariants.transition}
          whileHover={onHover.hover}
          onTap={{ scale: 0.9 }}
        >
          <h5 className="chooseModeText">Hot Seat</h5>
        </motion.div>

        <motion.div
          className="chooseMode"
          onClick={() => {
            history.push("/leaderboard");
          }}
          initial={rightBoxVariants.hidden}
          animate={rightBoxVariants.visible}
          transition={rightBoxVariants.transition}
          whileHover={onHover.hover}
        >
          <h5 className="chooseModeText">Leaderboard</h5>
        </motion.div>

        <motion.div
          className="chooseMode"
          initial={leftBoxVariants.hidden}
          animate={leftBoxVariants.visible}
          transition={leftBoxVariants.transition}
          whileHover={onHover.hover}
          onTap={{ scale: 0.9 }}
        >
          <h5 className="chooseModeText">Saved sea battles</h5>
        </motion.div>
      </div>
      <Login setPlayerData={setPlayer2Data} playerData={player2Data} />
    </div>
  );
};

export default Menu;

import React, {useContext} from "react";
import { pageSwitch } from "../animationVariants/animationVariants";
import { motion } from "framer-motion";
import { getLeaderboard } from "../services/leaderboard";
import {PlayersContext} from "../providers/PlayersContext";

const Leaderboard = () => {
  const { player1Data, setPlayer1Data, player2Data, setPlayer2Data } =
    useContext(PlayersContext);

  const data = getLeaderboard(player1Data[0].email);

  return (
    <motion.div
      className="mainContainer"
      initial={pageSwitch.hidden}
      animate={pageSwitch.visible}
      transition={pageSwitch.transition}
    >
      <h5 className="battleshipsText">Leaderboard</h5>
      {data.map((user) => (
        <div className="chooseMode" key={user.id}>
          <h5 className="chooseModeText">
            {" "}
            {user.nickname + " " + user.gamesWon}{" "}
          </h5>
        </div>
      ))}
    </motion.div>
  );
};

export default Leaderboard;

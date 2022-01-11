import React from "react";
import { pageSwitch } from "../animationVariants/animationVariants";
import { motion } from "framer-motion";
import { getLeaderboard } from "../services/leaderboard";

const Leaderboard = () => {
  const data = getLeaderboard();

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

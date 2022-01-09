import React from "react";
import { pageSwitch } from "../AnimationVariants/animationVariants";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const randomData = [
    { id: 1, username: "Piotr", points: 1000 },
    { id: 2, username: "Piotr 2115", points: 2000 },
    { id: 3, username: "Piotr siema", points: 5000 },
    { id: 4, username: "Piotr xd", points: 500 },
    { id: 5, username: "Piotr XD", points: 50 },
  ];

  function compare(a, b) {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }
    return 0;
  }

  randomData.sort(compare);

  return (
    <motion.div
      className="mainContainer"
      initial={pageSwitch.hidden}
      animate={pageSwitch.visible}
      transition={pageSwitch.transition}
    >
      <h5 className="battleshipsText">Leaderboard</h5>
      {randomData.map((user) => (
        <div className="chooseMode" key={user.id}>
          <h5 className="chooseModeText">
            {" "}
            {user.username + " " + user.points}{" "}
          </h5>
        </div>
      ))}
    </motion.div>
  );
};

export default Leaderboard;

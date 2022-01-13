import React from "react";
import { testHits } from "./testHits";
import { testGridPlayer } from "./testGridPlayer";
import { testGridOpponent } from "./testGridOpponent";
import { onHover, pageSwitch } from "../../animationVariants/animationVariants";
import { motion } from "framer-motion";

const ReplayList = ({ setReplay }) => {
  const testData = [
    [testHits, testGridPlayer, testGridOpponent],
    [[], [], []],
    [[], [], []],
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];

  return (
    <>
      <motion.div
        className="gameDiv"
        initial={pageSwitch.hidden}
        animate={pageSwitch.visible}
        transition={pageSwitch.transition}
        exit={pageSwitch.hidden}
      >
        <h1 style={{ color: "white" }}>Saved games!</h1>
        {testData.map((item, index) => (
          <div key={index}>
            <motion.button
              className="rotateButton"
              whileHover={onHover.hover}
              onTap={{ scale: 0.9 }}
              onClick={() => setReplay([true, [item[0], item[1], item[2]]])}
            >
              {" "}
              Test game
            </motion.button>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default ReplayList;

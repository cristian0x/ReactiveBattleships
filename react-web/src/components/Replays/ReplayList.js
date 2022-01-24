import React from "react";
import { testHits } from "./HitsGrids/testHits";
import { testGridPlayer } from "./HitsGrids/testGridPlayer";
import { testGridOpponent } from "./HitsGrids/testGridOpponent";
import { testHits1 } from "./HitsGrids/testHits1";
import { testGridPlayer1 } from "./HitsGrids/testGridPlayer1";
import { testGridOpponent1 } from "./HitsGrids/testGridOpponent1";
import { testHits2 } from "./HitsGrids/testHits2";
import { testGridPlayer2 } from "./HitsGrids/testGridPlayer2";
import { testGridOpponent2 } from "./HitsGrids/testGridOpponent2";
import { onHover, pageSwitch } from "../../animationVariants/animationVariants";
import { motion } from "framer-motion";

const ReplayList = ({ setReplay }) => {
  const testData = [
    [testHits, testGridPlayer, testGridOpponent],
    [testHits1, testGridPlayer1, testGridOpponent1],
    [testHits2, testGridPlayer2, testGridOpponent2],
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
        <h1
          style={{
            color: "white",
            paddingTop: 30,
            paddingBottom: 30,
            fontSize: 60,
          }}
        >
          Saved games!
        </h1>
        {testData.map((item, index) => (
          <div key={index}>
            <motion.button
              className="rotateButton"
              whileHover={onHover.hover}
              onTap={{ scale: 0.9 }}
              onClick={() => setReplay([true, [item[0], item[1], item[2]]])}
            >
              {" "}
              {"Saved game " + (index + 1)}
            </motion.button>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default ReplayList;

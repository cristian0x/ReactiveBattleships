import React from "react";
import { motion } from "framer-motion";
import { onHover } from "../animationVariants/animationVariants";
import { useState } from "react";
import ReplayList from "./ReplayList";
import Replay from "./replay";
import { testHits } from "./testHits";
import { testGridPlayer } from "./testGridPlayer";
import { testGridOpponent } from "./testGridOpponent";

const SavedSeaBattles = () => {
  const [replay, setReplay] = useState([false, []]);

  return (
    <>
      {!replay[0] ? (
        <ReplayList {...{ setReplay }} />
      ) : (
        <Replay {...{ replay }} />
      )}
    </>
  );
};

export default SavedSeaBattles;

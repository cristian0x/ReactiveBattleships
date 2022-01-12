import React from "react";
import { testHits } from "./testHits";
import { testGridPlayer } from "./testGridPlayer";
import { testGridOpponent } from "./testGridOpponent";

const ReplayList = ({ setReplay }) => {
  return (
    <div
      onClick={() =>
        setReplay([true, [testHits, testGridPlayer, testGridOpponent]])
      }
    >
      {" "}
      magic
    </div>
  );
};

export default ReplayList;

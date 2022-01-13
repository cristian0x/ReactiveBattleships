import React from "react";
import { useState } from "react";
import ReplayList from "../components/Replays/ReplayList";
import Replay from "../components/Replays/Replay";

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

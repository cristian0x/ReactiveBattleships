import React from "react";
import "../styles/node.css";

const Node = (props) => {
  const {
    col,
    row,
    isFilled,
    isHit,
    missed,
    isPlayersBoard,
    shipId,
    shipType,
  } = props;

  const extraClassName = isHit
    ? "node-hit"
    : isFilled
    ? "node-filled"
    : missed
    ? "node-missed"
    : "";

  return (
    <div
      id={`node-${row}-${col}-${isPlayersBoard}`}
      className={`node ${extraClassName}`}
    >
      {isFilled ? <span className="shipId">{shipId}</span> : "~"}
    </div>
  );
};

export default Node;

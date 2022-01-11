import React from "react";
import "../../styles/hotSeat.css";
import { useCycle } from "framer-motion";
import ShipsMenuExpanded from "./shipsMenuExpanded";

const ShipsMenu = ({
  setShipLength,
  isPlayerPlacingShips,
  shipsDirection,
  setShipsDirection,
  whoseTurn,
  refreshPage,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <>
      {isExpanded ? (
        <ShipsMenuExpanded
          {...{
            setShipLength,
            isPlayerPlacingShips,
            shipsDirection,
            setShipsDirection,
            whoseTurn,
            setIsExpanded,
          }}
        />
      ) : (
        <div className="shipsMenuHidden" onClick={() => setIsExpanded()}>
          ->
        </div>
      )}
    </>
  );
};

export default ShipsMenu;

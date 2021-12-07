import React from "react";
import "../styles/menu.css";
import { useHistory } from "react-router-dom";

const Menu = () => {
  let history = useHistory();

  return (
    <div className="mainContainer">
      <h5 className="battleshipsText">Battleships</h5>
      <div
        className="chooseMode"
        onClick={() => {
          history.push("/game");
        }}
      >
        <h5 className="chooseModeText">Computers Battle</h5>
      </div>
      <div className="chooseMode">
        <h5 className="chooseModeText">Singleplayer</h5>
      </div>
      <div className="chooseMode">
        <h5 className="chooseModeText">Hot Seat</h5>
      </div>
      <div className="chooseMode">
        <h5 className="chooseModeText">Leaderboard</h5>
      </div>
      <div className="chooseMode">
        <h5 className="chooseModeText">Saved sea battles</h5>
      </div>
    </div>
  );
};

export default Menu;

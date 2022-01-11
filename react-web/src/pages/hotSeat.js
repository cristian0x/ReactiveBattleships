import React, { useContext, useState } from "react";
import HotSeatBoard from "../components/HotSeat/hotSeatBoard";
import WinnerPage from "../components/HotSeat/WinnerPage";
import { PlayersContext } from "../providers/PlayersContext";

const HotSeat = () => {
  const [hasGameEnded, setHasGameEnded] = useState([false, "Winner name"]);
  const [gameMovesInOrder, setGameMovesInOrder] = useState([[], []]);

  const { player1Data, setPlayer1Data, player2Data, setPlayer2Data } =
    useContext(PlayersContext);

  return (
    <>
      {!hasGameEnded[0] ? (
        <HotSeatBoard
          {...{
            hasGameEnded,
            setHasGameEnded,
            setGameMovesInOrder,
            player1Data,
            player2Data
          }}
        />
      ) : (
        <WinnerPage {...{ hasGameEnded, gameMovesInOrder, player1Data, player2Data }} />
      )}
    </>
  );
};

export default HotSeat;

import React, {useState} from 'react';
import HotSeatBoard from "../components/HotSeat/hotSeatBoard";
import WinnerPage from "../components/HotSeat/WinnerPage";

const HotSeat = () => {

  const [hasGameEnded, setHasGameEnded] = useState([false, "Winner name"]);
  const [gameMovesInOrder, setGameMovesInOrder] = useState([[], []]);

  return (
    <>
      {!hasGameEnded[0] ? (<HotSeatBoard {...{hasGameEnded, setHasGameEnded, setGameMovesInOrder}}/>) : (<WinnerPage {...{hasGameEnded, gameMovesInOrder}}/>)}
    </>
  );
};

export default HotSeat;

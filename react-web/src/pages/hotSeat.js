import React, {useState} from 'react';
import HotSeatBoard from "../components/HotSeat/hotSeatBoard";
import WinnerPage from "../components/HotSeat/WinnerPage";

const HotSeat = () => {

  const [hasGameEnded, setHasGameEnded] = useState([false, "Winner name"]);

  return (
    <>
      {!hasGameEnded[0] ? (<HotSeatBoard {...{hasGameEnded, setHasGameEnded}}/>) : (<WinnerPage {...{hasGameEnded}}/>)}
    </>
  );
};

export default HotSeat;

import React, { useContext, useState } from "react";
import Board from "../components/SinglePlayer/Board";
import { useCycle } from "framer-motion";
import ShipsMenu from "../components/HotSeat/shipsMenu";
import { PlayersContext } from "../providers/PlayersContext";
import { createGrid } from "../functions/gridFunctions";
import { automaticShipLayout } from "../functions/automaticShipLayout";
import WinnerPage from "../components/HotSeat/WinnerPage";

const SinglePlayer = () => {
  const { player1Data } = useContext(PlayersContext);

  const [hasGameEnded, setHasGameEnded] = useState([false, "Winner name"]);

  const [hasAlreadyMoved, setHasAlreadyMoved] = useCycle([false, 0], [true, 1]);

  const [playerGrid, setPlayerGrid] = useState(createGrid());
  const [playerShootingBoard, setPlayerShootingBoard] = useState(createGrid());
  const [areShipsPlacedPlayer, setAreShipsPlacedPlayer] = useState([false, 0]);
  const [playerAvailableShips, setPlayerAvailableShips] = useState([
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
  ]);
  const [playerMovesInOrder, setPlayerMovesInOrder] = useState([]);
  const [playerFilledCells, setPlayerFilledCells] = useState([]);

  const [aiGrid, setAiGrid] = useState(automaticShipLayout(createGrid()));
  const [aiMovesInOrder, setAiMovesInOrder] = useState([]);

  const [whoseTurn, setWhoseTurn] = useState([
    player1Data[0].nickname,
    playerGrid,
    setPlayerGrid,
    playerShootingBoard,
    setPlayerShootingBoard,
    areShipsPlacedPlayer,
    setAreShipsPlacedPlayer,
    playerAvailableShips,
    setPlayerAvailableShips,
    aiGrid,
    setAiGrid,
    playerMovesInOrder,
    setPlayerMovesInOrder,
    playerFilledCells,
    setPlayerFilledCells,
  ]);

  const [isPlayerPlacingShips, setIsPlayerPlacingShips] = useState(false);

  const [shipLength, setShipLength] = useState(0);
  const [shipsDirection, setShipsDirection] = useCycle(
    [true, "horizontal"],
    [false, "vertical"]
  );

  const [isExpanded, setIsExpanded] = useCycle(false, true);

  const [isRefreshed, refreshPage] = useCycle(true, false);

  const [isBoardVisible, setIsBoardVisible] = useCycle(true, false);

  const [gameMovesInOrder, setGamesMovesInOrder] = useState([]);

  const player2Data = [{ id: 0, nickname: "Computer" }];

  return (
    <>
        {!hasGameEnded[0] ? (
          <div className="hotSeatContainer">
            <ShipsMenu
              {...{
                setShipLength,
                isPlayerPlacingShips,
                shipsDirection,
                setShipsDirection,
                whoseTurn,
                isExpanded,
                setIsExpanded,
              }}
            />
            <Board
              {...{
                whoseTurn,
                isExpanded,
                setIsExpanded,
                setIsPlayerPlacingShips,
                shipLength,
                shipsDirection,
                refreshPage,
                setIsBoardVisible,
                aiGrid,
                setAiGrid,
                aiMovesInOrder,
                setAiMovesInOrder,
                hasAlreadyMoved,
                setHasAlreadyMoved,
                hasGameEnded,
                setHasGameEnded,
              }}
            />{" "}
          </div>
        ) : (
          <>
            <WinnerPage
              {...{ hasGameEnded, gameMovesInOrder, player1Data, player2Data }}
            />
          </>
        )}
    </>
  );
};

export default SinglePlayer;

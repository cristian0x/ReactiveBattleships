import React, { useState } from "react";
import ShipsMenu from "./shipsMenu";
import "../../styles/hotSeat.css";
import { createGrid } from "../../functions/gridFunctions";
import GameBoard from "./GameBoard";
import { useCycle } from "framer-motion";
import PlayerChange from "./PlayerChange";

const HotSeatBoard = ({ hasGameEnded, setHasGameEnded, setGameMovesInOrder, player1Data}) => {
  const [isBoardVisible, setIsBoardVisible] = useCycle(true, false);

  const [hasAlreadyMoved, setHasAlreadyMoved] = useCycle([false, 0], [true, 0]);

  const [player1Grid, setPlayer1Grid] = useState(createGrid());
  const [player1ShootingBoard, setPlayer1ShootingBoard] = useState(
    createGrid()
  );
  const [areShipsPlacedPlayer1, setAreShipsPlacedPlayer1] = useState([
    false,
    0,
  ]);
  const [player1AvailableShips, setPlayer1AvailableShips] = useState([
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
  ]);
  const [player1MovesInOrder, setPlayer1MovesInOrder] = useState([]);

  const [player2Grid, setPlayer2Grid] = useState(createGrid());
  const [player2ShootingBoard, setPlayer2ShootingBoard] = useState(
    createGrid()
  );
  const [areShipsPlacedPlayer2, setAreShipsPlacedPlayer2] = useState([
    false,
    0,
  ]);
  const [player2AvailableShips, setPlayer2AvailableShips] = useState([
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
  ]);
  const [player2MovesInOrder, setPlayer2MovesInOrder] = useState([]);

  const [isPlayerPlacingShips, setIsPlayerPlacingShips] = useState(false);

  const [shipLength, setShipLength] = useState(0);
  const [shipsDirection, setShipsDirection] = useCycle(
    [true, "horizontal"],
    [false, "vertical"]
  );

  const [whoseTurn, setWhoseTurn] = useCycle(
    [
      player1Data[0].email, //username
      player1Grid,
      setPlayer1Grid,
      player1ShootingBoard,
      setPlayer1ShootingBoard,
      areShipsPlacedPlayer1,
      setAreShipsPlacedPlayer1,
      player1AvailableShips,
      setPlayer1AvailableShips,
      player2Grid,
      setPlayer2Grid,
      areShipsPlacedPlayer2,
      player1MovesInOrder,
      setPlayer1MovesInOrder,
      player2MovesInOrder
    ],
    [
      player1Data[0].email, //username
      player2Grid,
      setPlayer2Grid,
      player2ShootingBoard,
      setPlayer2ShootingBoard,
      areShipsPlacedPlayer2,
      setAreShipsPlacedPlayer2,
      player2AvailableShips,
      setPlayer2AvailableShips,
      player1Grid,
      setPlayer1Grid,
      areShipsPlacedPlayer1,
      player2MovesInOrder,
      setPlayer2MovesInOrder,
      player1MovesInOrder
    ]
  );

  const [isExpanded, setIsExpanded] = useCycle(false, true);

  const [isRefreshed, refreshPage] = useCycle(true, false);

  return (
    <>
      {isBoardVisible ? (
        <div className="hotSeatContainer">
          <ShipsMenu
            {...{
              setShipLength,
              isPlayerPlacingShips,
              shipsDirection,
              setShipsDirection,
              whoseTurn,
              isExpanded,
              setIsExpanded
            }}
          />
          <GameBoard
            {...{
              whoseTurn,
              setIsBoardVisible,
              shipLength,
              setIsPlayerPlacingShips,
              shipsDirection,
              refreshPage,
              hasAlreadyMoved,
              setHasAlreadyMoved,
              hasGameEnded,
              setHasGameEnded,
              setGameMovesInOrder,
              isExpanded,
              setIsExpanded
            }}
          />
        </div>
      ) : (
        <div className="hotSeatContainer">
          <PlayerChange
            {...{
              whoseTurn,
              setWhoseTurn,
              setIsBoardVisible,
              setHasAlreadyMoved,
            }}
          />
        </div>
      )}
    </>
  );
};

export default HotSeatBoard;

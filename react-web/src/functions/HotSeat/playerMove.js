import { checkIfTheGameEndedHotSeat } from "../checkIfTheGameEnded";

export const playerMove = (
  clickedRow,
  clickedColumn,
  playerGrid,
  playerShootingBoard,
  setPlayerShootingBoard,
  opponentLayout,
  setOpponentLayout,
  setIsUpToDate,
  setIsBoardVisible,
  areAllShipsPlaced,
  hasAlreadyMoved,
  setHasAlreadyMoved,
  hasGameEnded,
  setHasGameEnded,
  winnerName,
  hasOpponentPlacedShips,
  playerMoves,
  setPlayerMoves,
  opponentMoves,
  setGameMovesInOrder
) => {
  if (!areAllShipsPlaced[0]) return;
  if (!(hasOpponentPlacedShips[0] === true && areAllShipsPlaced[0] === true))
    return;
  if (hasAlreadyMoved[0]) return;
  if (hasGameEnded[0]) return;

  let playerShootingBoardCopy = playerShootingBoard;
  let opponentLayoutCopy = opponentLayout;
  let playerMovesCopy = playerMoves;

  if (checkIfShipHit(clickedRow, clickedColumn, opponentLayout)) {
    playerShootingBoardCopy[clickedRow][clickedColumn].isHit = true;
    playerShootingBoardCopy[clickedRow][clickedColumn].shipId = "~";
    opponentLayoutCopy[clickedRow][clickedColumn].isHit = true;
  } else {
    playerShootingBoardCopy[clickedRow][clickedColumn].isFilled = true;
    playerShootingBoardCopy[clickedRow][clickedColumn].shipId = "~";
    opponentLayoutCopy[clickedRow][clickedColumn].missed = true;
  }

  playerMovesCopy.push([clickedRow, clickedColumn]);
  setPlayerMoves(playerMovesCopy);

  setHasAlreadyMoved();
  setPlayerShootingBoard(playerShootingBoardCopy);
  setOpponentLayout(opponentLayoutCopy);
  setIsUpToDate();
  if (checkIfTheGameEndedHotSeat(playerGrid, opponentLayout)[0]) {
    setHasGameEnded([true, winnerName]);
    setGameMovesInOrder([playerMoves, opponentMoves])
    return;
  }
  setTimeout(() => {
    setIsBoardVisible();
  }, 1000);
};

const checkIfShipHit = (clickedRow, clickedColumn, opponentLayout) => {
  return opponentLayout[clickedRow][clickedColumn].isFilled;
};

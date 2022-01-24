import { checkIfShipHit } from "../HotSeat/playerMove";
import { checkIfTheGameEndedHotSeat } from "../checkIfTheGameEnded";

export const roundCycle = (
  clickedRow,
  clickedColumn,
  playerGrid,
  setPlayerGrid,
  playerShootingBoard,
  setPlayerShootingBoard,
  aiLayout,
  setAiLayout,
  aiMovesInOrder,
  aiIterator,
  setAiIterator,
  setIsUpToDate,
  areAllShipsPlaced,
  hasAlreadyMoved,
  setHasAlreadyMoved,
  hasGameEnded,
  setHasGameEnded,
  winnerName
) => {
  if (!areAllShipsPlaced[0]) return;
  if (hasAlreadyMoved[0]) return;
  if (hasGameEnded[0]) return;
  if (checkIfNodeAlreadyClicked(clickedRow, clickedColumn, playerShootingBoard))
    return;

  let playerShootingBoardCopy = playerShootingBoard;
  let opponentLayoutCopy = aiLayout;

  let haveShipBeenHit = false;

  if (checkIfShipHit(clickedRow, clickedColumn, opponentLayoutCopy)) {
    playerShootingBoardCopy[clickedRow][clickedColumn].isHit = true;
    playerShootingBoardCopy[clickedRow][clickedColumn].shipId = "~";
    opponentLayoutCopy[clickedRow][clickedColumn].isHit = true;
    haveShipBeenHit = true;
  } else {
    playerShootingBoardCopy[clickedRow][clickedColumn].isFilled = true;
    playerShootingBoardCopy[clickedRow][clickedColumn].shipId = "~";
    opponentLayoutCopy[clickedRow][clickedColumn].missed = true;
  }

  if (checkIfTheGameEndedHotSeat(playerGrid, opponentLayoutCopy)[0]) {
    setHasGameEnded([true, winnerName]);
    return;
  }

  // poor solution, used because lack of the time :c
  if (!haveShipBeenHit) {
    setHasAlreadyMoved();
    while (true) {
      if (
        aiMove(
          playerGrid,
          setPlayerGrid,
          aiLayout,
          aiMovesInOrder,
          aiIterator,
          setAiIterator,
          setIsUpToDate,
          setHasGameEnded
        )
      ) {
        setTimeout(() => {
          aiMove(
            playerGrid,
            setPlayerGrid,
            aiLayout,
            aiMovesInOrder,
            aiIterator + 1,
            setAiIterator,
            setIsUpToDate,
            setHasGameEnded
          );
        }, 500);
        break;
      }
      break;
    }
    setHasAlreadyMoved();
  }
  setPlayerShootingBoard(playerShootingBoardCopy);
  setAiLayout(opponentLayoutCopy);
  setIsUpToDate();
  console.log(opponentLayoutCopy)
};

const aiMove = (
  playerGrid,
  setPlayerGrid,
  aiLayout,
  aiMovesInOrder,
  aiIterator,
  setAiIterator,
  setIsUpToDate,
  setHasGameEnded
) => {
  let playerGridCopy = playerGrid;
  let aiLayoutCopy = aiLayout;

  let haveAiHit = false;

  if (
    checkIfShipHit(
      aiMovesInOrder[aiIterator][0],
      aiMovesInOrder[aiIterator][1],
      playerGridCopy
    )
  ) {
    playerGridCopy[aiMovesInOrder[aiIterator][0]][
      aiMovesInOrder[aiIterator][1]
    ].isHit = true;
    if (checkIfTheGameEndedHotSeat(playerGridCopy, aiLayoutCopy)[0]) {
      setHasGameEnded([true, "Computer won"]);
    }
    haveAiHit = true;
  } else {
    playerGridCopy[aiMovesInOrder[aiIterator][0]][
      aiMovesInOrder[aiIterator][1]
    ].missed = true;
  }
  setPlayerGrid(playerGridCopy);
  setIsUpToDate();
  setAiIterator(aiIterator + 1);

  return haveAiHit;
};

const checkIfNodeAlreadyClicked = (
  clickedRow,
  clickedColumn,
  playerShootingBoard
) => {
  return (
    playerShootingBoard[clickedRow][clickedColumn].isHit ||
    playerShootingBoard[clickedRow][clickedColumn].isFilled
  );
};

import { ai } from "./ai";

export const handleGameStart = (
  setIsExpanded,
  setHasGameStarted,
  playerBoard,
  playerFilledCells,
  setPlayerFiledCells,
  aiDifficulty,
  aiGrid,
  setAiGrid,
  aiMovesInOrder,
  setAiMovesInOrder
) => {
  setIsExpanded();
  setHasGameStarted(true);
  setFilledCells(playerFilledCells, setPlayerFiledCells, playerBoard);
  setAiMoves(
    aiMovesInOrder,
    playerBoard,
    aiGrid,
    playerFilledCells,
    aiDifficulty,
    setAiMovesInOrder
  );
};

const setFilledCells = (
  playerFilledCells,
  setPlayerFilledCells,
  playerBoard
) => {
  let playerFilledCellsCopy = playerFilledCells;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (playerBoard[i][j].isFilled) {
        playerFilledCellsCopy.push([i, j]);
      }
    }
  }
  setPlayerFilledCells(playerFilledCellsCopy);
};

const setAiMoves = (
  aiMovesInOrder,
  playerBoard,
  aiGrid,
  playerFilledCells,
  aiDifficulty,
  setAiMovesInOrder
) => {
  let aiMovesInOrderCopy = aiMovesInOrder;
  aiMovesInOrderCopy.push(
    ai(
      playerBoard,
      aiGrid[0],
      playerFilledCells,
      aiGrid[1],
      "easy",
      aiDifficulty
    )[3]
  );
  setAiMovesInOrder(...aiMovesInOrderCopy);
};

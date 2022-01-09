export function checkIfTheGameEnded(
  gridPlayer,
  gridOpponent,
  playerFilledCells,
  opponentFilledCells
) {
  var playerWon = false;
  var opponentWon = false;

  var playerCount = 0;
  var opponentCount = 0;

  for (let i = 0; i < 20; i++) {
    if (
      gridPlayer[playerFilledCells[i][0]][playerFilledCells[i][1]].isHit ===
      true
    ) {
      playerCount++;
    }

    if (
      gridOpponent[opponentFilledCells[i][0]][opponentFilledCells[i][1]]
        .isHit === true
    ) {
      opponentCount++;
    }
  }

  if (playerCount === 20) {
    playerWon = true;
    return [true, "opponentWon"];
  }
  if (opponentCount === 20) {
    opponentWon = true;
    return [true, "playerWon"];
  }
  return [false, ""];
}

//---------------------------------------------------------------------------------------//

export const checkIfTheGameEndedHotSeat = (playerGrid, opponentGrid) => {
  let playerCount = 0;
  let opponentCount = 0;

  for (let i = 0; i < 10; i++) {
    for (let j =0; j < 10; j++) {
      if (playerGrid[i][j].isHit) {
        playerCount += 1
      }

      if (opponentGrid[i][j].isHit) {
        opponentCount += 1
      }
    }
  }

  if (playerCount === 20) {
    return [true, "opponentWon"];
  }
  if (opponentCount === 20) {
    return [true, "playerWon"];
  }
  return [false, ""];
};

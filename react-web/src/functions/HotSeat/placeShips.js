export const placeShips = (
  clickedRow,
  clickedColumn,
  playerGrid,
  setPlayerGrid,
  shipLength,
  shipDirection,
  lastShipID,
  setLastShipID,
  setIsUpToDate,
  playerAvailableShips,
  setPlayerAvailableShips,
  areAllShipsPlaced,
  setAreAllShipsPlaced,
  setIsBoardVisible
) => {
  if (shipLength === 0) return;
  if (playerGrid[clickedRow][clickedColumn].isFilled) return;
  if (playerAvailableShips[shipLength - 1][1] < 1) return;
  let shipCounter = 0;

  let areAllShipsPlacedCopy = areAllShipsPlaced;

  switch (shipDirection) {
    case "horizontal":
      if (shipLength + clickedColumn > 10) return;
      if (!checkHorizontal(clickedRow, clickedColumn, playerGrid, shipLength))
        return;
      //console.log(lastShipID);
      setPlayerGrid(
        placeShipHorizontal(
          clickedRow,
          clickedColumn,
          playerGrid,
          shipLength,
          lastShipID
        )
      );
      setPlayerAvailableShips(
        setAvailableShips(playerAvailableShips, shipLength)
      );
      setLastShipID();
      setIsUpToDate();

      // did not have time to deal with this issue, so used for loop to check amount of ships left
      for (let i = 0; i < 4; i++) {
        shipCounter += playerAvailableShips[i][1];
      }
      if (!(shipCounter === 0)) return;

      areAllShipsPlacedCopy[0] = true;
      setAreAllShipsPlaced(areAllShipsPlacedCopy);
      setTimeout(() => {
        setIsBoardVisible();
      }, 1500);

      //console.log("horizontal" + clickedRow + clickedColumn + shipLength);
      break;
    case "vertical":
      if (shipLength + clickedRow > 10) return;
      if (!checkVertical(clickedRow, playerGrid, shipLength)) return;
      //console.log(lastShipID);
      setPlayerGrid(
        placeShipVertical(
          clickedRow,
          clickedColumn,
          playerGrid,
          shipLength,
          lastShipID
        )
      );
      setPlayerAvailableShips(
        setAvailableShips(playerAvailableShips, shipLength)
      );
      setLastShipID();
      setIsUpToDate();

      // did not have time to deal with this issue, so used for loop to check amount of ships left
      for (let i = 0; i < 4; i++) {
        shipCounter += playerAvailableShips[i][1];
      }
      if (!(shipCounter === 0)) return;

      areAllShipsPlacedCopy[0] = true;
      setAreAllShipsPlaced(areAllShipsPlacedCopy);
      setIsBoardVisible();

      //console.log("vertical" + clickedRow + clickedColumn + shipLength);
      break;
    default:
      console.log("default");
      break;
  }
};

const checkHorizontal = (clickedRow, clickedColumn, playerGrid, shipLength) => {
  for (let i = 0; i < shipLength; i++) {
    if (playerGrid[clickedRow][clickedColumn + i].isFilled) return false;
  }

  return true;
};

const placeShipHorizontal = (
  clickedRow,
  clickedColumn,
  playerGrid,
  shipLength,
  shipID
) => {
  let playerGridCopy = playerGrid;
  for (let i = 0; i < shipLength; i++) {
    playerGridCopy[clickedRow][clickedColumn + i].isFilled = true;
    playerGridCopy[clickedRow][clickedColumn + i].shipId = shipID;
  }

  return playerGridCopy;
};

const checkVertical = (clickedRow, clickedColumn, playerGrid, shipLength) => {
  for (let i = 0; i < shipLength; i++) {
    if (playerGrid[clickedRow + i][clickedColumn].isFilled) return false;
  }

  return true;
};

const placeShipVertical = (
  clickedRow,
  clickedColumn,
  playerGrid,
  shipLength,
  shipID
) => {
  let playerGridCopy = playerGrid;
  for (let i = 0; i < shipLength; i++) {
    playerGridCopy[clickedRow + i][clickedColumn].isFilled = true;
    playerGridCopy[clickedRow + i][clickedColumn].shipId = shipID;
  }

  return playerGridCopy;
};

const setAvailableShips = (playerShipsStatus, shipLength) => {
  let playerShipsStatusCopy = playerShipsStatus;
  playerShipsStatusCopy[shipLength - 1][1] -= 1;

  return playerShipsStatusCopy;
};

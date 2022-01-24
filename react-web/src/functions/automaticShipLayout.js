function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
  let directions = ["up", "down", "right", "left"];
  let randomDirection = Math.floor(Math.random() * directions.length);
  return randomDirection;
}

function getOppositeDirection(direction) {
  switch (direction) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "right":
      return "left";
    case "left":
      return "right";
    default:
      break;
  }
}

function isInArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length) return true;
    }
  }
  return false;
}

function isInRange(rowOrColumn) {
  if (rowOrColumn < 0 || rowOrColumn > 9) {
    return false;
  } else {
    return true;
  }
}

function isShipPlacementPossible(
  filledCells,
  randomRow,
  randomCol,
  randomDirection,
  shipSize
) {
  let randomRowCopy = randomRow;
  let randomColCopy = randomCol;
  let randomDirectionCopy = randomDirection;
  let initialRowCopy = randomRow;
  let initialColCopy = randomCol;

  let item = [];

  for (let i = 0; i < shipSize; i++) {
    item = [randomRowCopy, randomColCopy];

    if (isInArray(filledCells, item)) {
      return false;
    } else {
      switch (randomDirectionCopy) {
        case "up":
          if (isInRange(randomRowCopy)) {
            randomRowCopy--;
          } else {
            randomDirectionCopy = "down";
            randomRowCopy = initialRowCopy + 1;
          }
          break;
        case "down":
          if (isInRange(randomRowCopy)) {
            randomRowCopy++;
          } else {
            randomDirectionCopy = "up";
            randomRowCopy = initialRowCopy - 1;
          }
          break;
        case "right":
          if (isInRange(randomColCopy)) {
            randomColCopy++;
          } else {
            randomDirectionCopy = "left";
            randomColCopy = initialColCopy - 1;
          }
          break;
        case "left":
          if (isInRange(randomColCopy)) {
            randomColCopy--;
          } else {
            randomDirectionCopy = "right";
            randomColCopy = initialColCopy + 1;
          }
          break;
        default:
          break;
      }
    }
  }
  return true;
}

function assignNodeToTheShipType(shipSize, grid, randomRow, randomCol) {
  if (shipSize == 4) grid[randomRow][randomCol].shipType = "carrier";
  if (shipSize == 3) grid[randomRow][randomCol].shipType = "battleship";
  if (shipSize == 2) grid[randomRow][randomCol].shipType = "destroyer";
  if (shipSize == 1) grid[randomRow][randomCol].shipType = "submarine";
}

function createShip(grid, filledCells, shipSize, shipId) {
  while (true) {
    var randomRow = getRandomInt(0, 9);
    var randomCol = getRandomInt(0, 9);
    var directions = ["up", "down", "right", "left"];
    var randomDirection = directions[getRandomDirection()];

    if (
      isShipPlacementPossible(
        filledCells,
        randomRow,
        randomCol,
        randomDirection,
        shipSize
      )
    ) {
      break;
    }
  }

  let initialRow = randomRow;
  let initialCol = randomCol;

  let shift = 0;
  let item = [];

  for (let i = 0; i < shipSize; i++) {
    switch (randomDirection) {
      case "up":
        if (!isInRange(randomRow)) {
          randomDirection = getOppositeDirection(randomDirection);
          randomRow = initialRow + 1;
          grid[randomRow][randomCol].isFilled = true;
          grid[randomRow][randomCol].shipId = shipId;
          assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
          grid[randomRow][randomCol].direction = randomDirection;
          item = [randomRow, randomCol];
          filledCells.push(item);
          shift++;
          break;
        }
        randomRow -= shift;
        grid[randomRow][randomCol].isFilled = true;
        grid[randomRow][randomCol].shipId = shipId;
        assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
        grid[randomRow][randomCol].direction = randomDirection;
        item = [randomRow, randomCol];
        filledCells.push(item);
        randomRow = randomRow - 1 + shift;
        break;

      case "down":
        if (!isInRange(randomRow)) {
          randomDirection = getOppositeDirection(randomDirection);
          randomRow = initialRow - 1;
          grid[randomRow][randomCol].isFilled = true;
          grid[randomRow][randomCol].shipId = shipId;
          assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
          grid[randomRow][randomCol].direction = randomDirection;
          item = [randomRow, randomCol];
          filledCells.push(item);
          shift++;
          break;
        }
        randomRow += shift;
        grid[randomRow][randomCol].isFilled = true;
        grid[randomRow][randomCol].shipId = shipId;
        assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
        grid[randomRow][randomCol].direction = randomDirection;
        item = [randomRow, randomCol];
        filledCells.push(item);
        randomRow = randomRow + 1 - shift;
        break;

      case "right":
        if (!isInRange(randomCol)) {
          randomDirection = getOppositeDirection(randomDirection);
          randomCol = initialCol - 1;
          grid[randomRow][randomCol].isFilled = true;
          grid[randomRow][randomCol].shipId = shipId;
          assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
          grid[randomRow][randomCol].direction = randomDirection;
          item = [randomRow, randomCol];
          filledCells.push(item);
          shift++;
          break;
        }
        randomCol += shift;
        grid[randomRow][randomCol].isFilled = true;
        grid[randomRow][randomCol].shipId = shipId;
        assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
        grid[randomRow][randomCol].direction = randomDirection;
        item = [randomRow, randomCol];
        filledCells.push(item);
        randomCol = randomCol + 1 - shift;
        break;

      case "left":
        if (!isInRange(randomCol)) {
          randomDirection = getOppositeDirection(randomDirection);
          randomCol = initialCol + 1;
          grid[randomRow][randomCol].isFilled = true;
          grid[randomRow][randomCol].shipId = shipId;
          assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
          grid[randomRow][randomCol].direction = randomDirection;
          item = [randomRow, randomCol];
          filledCells.push(item);
          shift++;
          break;
        }
        randomCol -= shift;
        grid[randomRow][randomCol].isFilled = true;
        grid[randomRow][randomCol].shipId = shipId;
        assignNodeToTheShipType(shipSize, grid, randomRow, randomCol);
        grid[randomRow][randomCol].direction = randomDirection;
        item = [randomRow, randomCol];
        filledCells.push(item);
        randomCol = randomCol - 1 + shift;
        break;

      default:
        break;
    }
  }
}
export function automaticShipLayout(grid) {
  const filledCells = [];
  const [carrier, battleship, destroyer, submarine] = [4, 3, 2, 1];

  createShip(grid, filledCells, carrier, 0);
  createShip(grid, filledCells, battleship, 1);
  createShip(grid, filledCells, battleship, 2);
  createShip(grid, filledCells, destroyer, 3);
  createShip(grid, filledCells, destroyer, 4);
  createShip(grid, filledCells, destroyer, 5);
  createShip(grid, filledCells, submarine, 6);
  createShip(grid, filledCells, submarine, 7);
  createShip(grid, filledCells, submarine, 8);
  createShip(grid, filledCells, submarine, 9);

  console.log(grid)

  return [grid, filledCells];
}

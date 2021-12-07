export function checkIfTheShipSank(shipIdCount, who) {
  for (const [key, value] of shipIdCount.entries()) {
    switch (key) {
      case 0:
        if (value == 4) {
          if (who === "player") {
            console.log("The player's carrier was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's carrier was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "carrier"];
        }
        break;
      case 1:
        if (value == 3) {
          if (who === "player") {
            console.log("The player's battleship was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's battleship was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "battleship"];
        }
        break;
      case 2:
        if (value == 3) {
          if (who === "player") {
            console.log("The player's battleship was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's battleship was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "battleship"];
        }
        break;
      case 3:
        if (value == 2) {
          if (who === "player") {
            console.log("The player's destroyer was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's destroyer was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "destroyer"];
        }
        break;
      case 4:
        if (value == 2) {
          if (who === "player") {
            console.log("The player's destroyer was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's destroyer was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "destroyer"];
        }
        break;
      case 5:
        if (value == 2) {
          if (who === "player") {
            console.log("The player's destroyer was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's destroyer was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "destroyer"];
        }
        break;
      case 6:
        if (value == 1) {
          if (who === "player") {
            console.log("The player's submarine was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's submarine was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "submarine"];
        }
        break;
      case 7:
        if (value == 1) {
          if (who === "player") {
            console.log("The player's submarine was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's submarine was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "submarine"];
        }
        break;
      case 8:
        if (value == 1) {
          if (who === "player") {
            console.log("The player's submarine was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's submarine was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "submarine"];
        }
        break;
      case 9:
        if (value == 1) {
          if (who === "player") {
            console.log("The player's submarine was sunk");
            shipIdCount.set(key, -1);
          } else {
            console.log("The opponent's submarine was sunk");
            shipIdCount.set(key, -1);
          }
          return [true, "submarine"];
        }
        break;
      default:
        break;
    }
  }
  return [false, ""];
}

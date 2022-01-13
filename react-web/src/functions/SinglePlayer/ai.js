import {checkIfTheGameEnded} from "../checkIfTheGameEnded";
import {checkIfTheShipSank} from "../checkIfTheShipSank";


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInRange(rowOrColumn) {
  if (rowOrColumn < 0 || rowOrColumn > 9) {
    return false;
  } else {
    return true;
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

export function ai(
  gridPlayer,
  gridOpponent,
  playerFilledCells,
  opponentFilledCells,
  difficultyLevelForPlayer,
  difficultyLevelForOpponent
) {
  var nodesHitInOrderForPlayer = [];
  var nodesHitInOrderForOpponent = [];
  var shipHitPlayer = [];
  var shipHitOpponent = [];
  var didPlayerHit = [];
  var didOpponentHit = [];
  var hits = [];

  var shipIdCountForPlayer = new Map();
  var shipIdCountForOpponent = new Map();

  var checkIfTheShipSankVar;

  for (let i = 0; i < 10; i++) {
    shipIdCountForPlayer.set(i, 0);
    shipIdCountForOpponent.set(i, 0);
  }

  while (
    !checkIfTheGameEnded(
      gridPlayer,
      gridOpponent,
      playerFilledCells,
      opponentFilledCells
    )[0]
    ) {
    var isShotOnTarget = true;

    switch (difficultyLevelForPlayer) {
      case "easy":
        while (
          isShotOnTarget &&
          !checkIfTheGameEnded(
            gridPlayer,
            gridOpponent,
            playerFilledCells,
            opponentFilledCells
          )[0]
          ) {
          while (true) {
            var randomRowPlayer = getRandomInt(0, 9);
            var randomColPlayer = getRandomInt(0, 9);
            var itemPlayer = [randomRowPlayer, randomColPlayer];

            if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
              break;
            }
          }
          if (isInArray(playerFilledCells, itemPlayer)) {
            isShotOnTarget = true;
            shipIdCountForPlayer.set(
              gridPlayer[randomRowPlayer][randomColPlayer].shipId,
              shipIdCountForPlayer.get(
                gridPlayer[randomRowPlayer][randomColPlayer].shipId
              ) + 1
            );
            nodesHitInOrderForPlayer.push(itemPlayer);
            shipHitPlayer.push(itemPlayer);
            didPlayerHit.push(1);
            checkIfTheShipSankVar = checkIfTheShipSank(
              shipIdCountForPlayer,
              "player"
            );
            if (checkIfTheShipSankVar[0]) {
              hits.push([
                randomRowPlayer,
                randomColPlayer,
                "player",
                1,
                1,
                checkIfTheShipSankVar[1],
              ]);
            } else {
              hits.push([randomRowPlayer, randomColPlayer, "player", 1, 0, ""]);
            }
          } else {
            isShotOnTarget = false;
            nodesHitInOrderForPlayer.push(itemPlayer);
            didPlayerHit.push(0);
            hits.push([randomRowPlayer, randomColPlayer, "player", 0, 0, ""]);
          }
        }

        break;

      case "medium":
        var previousRandomRowPlayer;
        var previousRandomColPlayer;
        var countOfShotsOnTarget = 0;
        var itemPlayer;
        var numbers;

        while (
          isShotOnTarget &&
          !checkIfTheGameEnded(
            gridPlayer,
            gridOpponent,
            playerFilledCells,
            opponentFilledCells
          )[0]
          ) {
          while (countOfShotsOnTarget == 0) {
            var randomRowPlayer = getRandomInt(0, 9);
            var randomColPlayer = getRandomInt(0, 9);
            itemPlayer = [randomRowPlayer, randomColPlayer];

            if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
              break;
            }
          }

          if (countOfShotsOnTarget > 0) {
            var case0 = false,
              case1 = false,
              case2 = false,
              case3 = false;
            while (true) {
              numbers = [0, 1, 2, 3];
              var randomNumber = numbers[getRandomInt(0, numbers.length - 1)];
              switch (randomNumber) {
                case 0: // up
                  previousRandomRowPlayer -= 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  case0 = true;
                  break;
                case 1: // down
                  previousRandomRowPlayer += 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  case1 = true;
                  break;
                case 2: // right
                  previousRandomColPlayer += 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  case2 = true;
                  break;
                case 3: // left
                  previousRandomColPlayer -= 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  case3 = true;
                  break;
                default:
                  break;
              }
              if (case0 && case1 && case2 && case3) {
                countOfShotsOnTarget = 0;
                while (true) {
                  var randomRowPlayer = getRandomInt(0, 9);
                  var randomColPlayer = getRandomInt(0, 9);
                  itemPlayer = [randomRowPlayer, randomColPlayer];

                  if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
                    break;
                  }
                }
                break;
              } else if (
                !isInRange(itemPlayer[0]) ||
                !isInRange(itemPlayer[1])
              ) {
                // pass
              } else if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
                break;
              }
            }
          }

          if (isInArray(playerFilledCells, itemPlayer)) {
            var isShotOnTarget = true;

            if (countOfShotsOnTarget > 0) {


              shipIdCountForPlayer.set(
                gridPlayer[itemPlayer[0]][itemPlayer[1]].shipId,
                shipIdCountForPlayer.get(
                  gridPlayer[itemPlayer[0]][itemPlayer[1]].shipId
                ) + 1
              );

              checkIfTheShipSankVar = checkIfTheShipSank(
                shipIdCountForPlayer,
                "player"
              );

              if (checkIfTheShipSankVar[0]) {
                hits.push([
                  itemPlayer[0],
                  itemPlayer[1],
                  "player",
                  1,
                  1,
                  checkIfTheShipSankVar[1],
                ]);
              } else {
                hits.push([itemPlayer[0], itemPlayer[1], "player", 1, 0, ""]);
              }
            } else {

              shipIdCountForPlayer.set(
                gridPlayer[randomRowPlayer][randomColPlayer].shipId,
                shipIdCountForPlayer.get(
                  gridPlayer[randomRowPlayer][randomColPlayer].shipId
                ) + 1
              );

              checkIfTheShipSankVar = checkIfTheShipSank(
                shipIdCountForPlayer,
                "player"
              );

              if (checkIfTheShipSankVar[0]) {
                hits.push([
                  randomRowPlayer,
                  randomColPlayer,
                  "player",
                  1,
                  1,
                  checkIfTheShipSankVar[1],
                ]);
              } else {
                hits.push([
                  randomRowPlayer,
                  randomColPlayer,
                  "player",
                  1,
                  0,
                  "",
                ]);
              }

              previousRandomRowPlayer = randomRowPlayer;
              previousRandomColPlayer = randomColPlayer;
            }

            countOfShotsOnTarget++;

            nodesHitInOrderForPlayer.push(itemPlayer);
            shipHitPlayer.push(itemPlayer);
          } else {
            if (countOfShotsOnTarget > 0) {
              isShotOnTarget = false;
              countOfShotsOnTarget = 0;
              nodesHitInOrderForPlayer.push(itemPlayer);
              hits.push([itemPlayer[0], itemPlayer[1], "player", 0, 0, ""]);
            } else {
              isShotOnTarget = false;
              countOfShotsOnTarget = 0;
              nodesHitInOrderForPlayer.push(itemPlayer);
              hits.push([randomRowPlayer, randomColPlayer, "player", 0, 0, ""]);
            }
          }
        }
        break;

      case "hard":
        var previousRandomRowPlayer;
        var previousRandomColPlayer;
        var countOfShotsOnTarget = 0;
        var itemPlayer;
        var direction;

        while (
          isShotOnTarget &&
          !checkIfTheGameEnded(
            gridPlayer,
            gridOpponent,
            playerFilledCells,
            opponentFilledCells
          )[0]
          ) {
          while (countOfShotsOnTarget == 0) {
            var randomNumber = getRandomInt(0, 3);

            switch (randomNumber) {
              case 0:
                var randomRowPlayer = getRandomInt(0, 9);
                var randomColPlayer = getRandomInt(0, 9);
                itemPlayer = [randomRowPlayer, randomColPlayer];
                break;
              case 1:
                var randomIndex = getRandomInt(0, playerFilledCells.length - 1);
                var randomRowPlayer = playerFilledCells[randomIndex][0];
                var randomColPlayer = playerFilledCells[randomIndex][1];
                itemPlayer = [randomRowPlayer, randomColPlayer];
                break;
              case 2:
                var randomRowPlayer = getRandomInt(0, 9);
                var randomColPlayer = getRandomInt(0, 9);
                itemPlayer = [randomRowPlayer, randomColPlayer];
                break;
              case 3:
                var randomRowPlayer = getRandomInt(0, 9);
                var randomColPlayer = getRandomInt(0, 9);
                itemPlayer = [randomRowPlayer, randomColPlayer];
                break;
              default:
                break;
            }

            if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
              break;
            }
          }

          if (countOfShotsOnTarget > 0) {
            var isDirectionValid = true;
            var case0 = false,
              case1 = false,
              case2 = false,
              case3 = false;
            while (isDirectionValid) {
              switch (direction) {
                case "up":
                  case0 = true;
                  previousRandomRowPlayer -= 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  break;
                case "down":
                  case1 = true;
                  previousRandomRowPlayer += 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  break;
                case "right":
                  case2 = true;
                  previousRandomColPlayer += 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  break;
                case "left":
                  case3 = true;
                  previousRandomColPlayer -= 1;
                  itemPlayer = [
                    previousRandomRowPlayer,
                    previousRandomColPlayer,
                  ];
                  break;

                default:
                  break;
              }

              if (case0 && case1 && case2 && case3) {
                countOfShotsOnTarget = 0;
                while (true) {
                  var randomNumber = getRandomInt(0, 2);

                  switch (randomNumber) {
                    case 0:
                      var randomRowPlayer = getRandomInt(0, 9);
                      var randomColPlayer = getRandomInt(0, 9);
                      itemPlayer = [randomRowPlayer, randomColPlayer];
                      break;
                    case 1:
                      var randomIndex = getRandomInt(
                        0,
                        playerFilledCells.length
                      );
                      var randomRowPlayer = playerFilledCells[randomIndex][0];
                      var randomColPlayer = playerFilledCells[randomIndex][1];
                      itemPlayer = [randomRowPlayer, randomColPlayer];
                      break;
                    case 2:
                      var randomRowPlayer = getRandomInt(0, 9);
                      var randomColPlayer = getRandomInt(0, 9);
                      itemPlayer = [randomRowPlayer, randomColPlayer];
                      break;
                    default:
                      break;
                  }

                  if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
                    break;
                  }
                }
                break;
              } else if (
                !isInRange(itemPlayer[0]) ||
                !isInRange(itemPlayer[1])
              ) {
                // pass
                direction = getOppositeDirection(direction);
              } else if (!isInArray(nodesHitInOrderForPlayer, itemPlayer)) {
                break;
              }
            }
          }

          if (isInArray(playerFilledCells, itemPlayer)) {
            var isShotOnTarget = true;

            if (countOfShotsOnTarget > 0) {

              shipIdCountForPlayer.set(
                gridPlayer[itemPlayer[0]][itemPlayer[1]].shipId,
                shipIdCountForPlayer.get(
                  gridPlayer[itemPlayer[0]][itemPlayer[1]].shipId
                ) + 1
              );

              checkIfTheShipSankVar = checkIfTheShipSank(
                shipIdCountForPlayer,
                "player"
              );

              if (checkIfTheShipSankVar[0]) {
                hits.push([
                  itemPlayer[0],
                  itemPlayer[1],
                  "player",
                  1,
                  1,
                  checkIfTheShipSankVar[1],
                ]);
              } else {
                hits.push([itemPlayer[0], itemPlayer[1], "player", 1, 0, ""]);
              }
            } else {

              shipIdCountForPlayer.set(
                gridPlayer[randomRowPlayer][randomColPlayer].shipId,
                shipIdCountForPlayer.get(
                  gridPlayer[randomRowPlayer][randomColPlayer].shipId
                ) + 1
              );

              checkIfTheShipSankVar = checkIfTheShipSank(
                shipIdCountForPlayer,
                "player"
              );

              if (checkIfTheShipSankVar[0]) {
                hits.push([
                  randomRowPlayer,
                  randomColPlayer,
                  "player",
                  1,
                  1,
                  checkIfTheShipSankVar[1],
                ]);
              } else {
                hits.push([
                  randomRowPlayer,
                  randomColPlayer,
                  "player",
                  1,
                  0,
                  "",
                ]);
              }

              direction =
                gridPlayer[randomRowPlayer][randomColPlayer].direction;
              previousRandomRowPlayer = randomRowPlayer;
              previousRandomColPlayer = randomColPlayer;
            }

            countOfShotsOnTarget++;

            if (checkIfTheShipSankVar[0]) {
              countOfShotsOnTarget = 0;
            }

            nodesHitInOrderForPlayer.push(itemPlayer);
            shipHitPlayer.push(itemPlayer);
          } else {
            isShotOnTarget = false;

            if (countOfShotsOnTarget > 0) {
              isShotOnTarget = false;
              countOfShotsOnTarget = 0;

              nodesHitInOrderForPlayer.push(itemPlayer);
              hits.push([itemPlayer[0], itemPlayer[1], "player", 0, 0, ""]);
            } else {
              isShotOnTarget = false;
              countOfShotsOnTarget = 0;
              nodesHitInOrderForPlayer.push(itemPlayer);
              hits.push([randomRowPlayer, randomColPlayer, "player", 0, 0, ""]);
            }

            nodesHitInOrderForPlayer.push(itemPlayer);
          }
        }
        break;

      default:
        break;
    }

    var isShotOnTarget = true;

    if (
      !checkIfTheGameEnded(
        gridPlayer,
        gridOpponent,
        playerFilledCells,
        opponentFilledCells
      )[0]
    ) {
      switch (difficultyLevelForOpponent) {
        case "easy":
          while (
            isShotOnTarget &&
            !checkIfTheGameEnded(
              gridPlayer,
              gridOpponent,
              playerFilledCells,
              opponentFilledCells
            )[0]
            ) {
            while (true) {
              var randomRowOpponent = getRandomInt(0, 9);
              var randomColOpponent = getRandomInt(0, 9);
              var itemOpponent = [randomRowOpponent, randomColOpponent];

              if (!isInArray(nodesHitInOrderForOpponent, itemOpponent)) {
                break;
              }
            }

            if (isInArray(opponentFilledCells, itemOpponent)) {
              var isShotOnTarget = true;
              gridOpponent[randomRowOpponent][randomColOpponent].isHit = true;
              shipIdCountForOpponent.set(
                gridOpponent[randomRowOpponent][randomColOpponent].shipId,
                shipIdCountForOpponent.get(
                  gridOpponent[randomRowOpponent][randomColOpponent].shipId
                ) + 1
              );
              nodesHitInOrderForOpponent.push(itemOpponent);
              shipHitOpponent.push(itemOpponent);
              didOpponentHit.push(1);
              checkIfTheShipSankVar = checkIfTheShipSank(
                shipIdCountForOpponent,
                "opponent"
              );
              if (checkIfTheShipSankVar[0]) {
                hits.push([
                  randomRowOpponent,
                  randomColOpponent,
                  "opponent",
                  1,
                  1,
                  checkIfTheShipSankVar[1],
                ]);
              } else {
                hits.push([
                  randomRowOpponent,
                  randomColOpponent,
                  "opponent",
                  1,
                  0,
                  "",
                ]);
              }
            } else {
              var isShotOnTarget = false;
              gridOpponent[randomRowOpponent][randomColOpponent].missed = true;
              nodesHitInOrderForOpponent.push(itemOpponent);
              didOpponentHit.push(0);
              hits.push([
                randomRowOpponent,
                randomColOpponent,
                "opponent",
                0,
                0,
                "",
              ]);
            }
          }

          break;

        case "medium":
          var previousRandomRowOpponent;
          var previousRandomColOpponent;
          var countOfShotsOnTarget = 0;
          var itemOpponent;
          var numbers;

          while (
            isShotOnTarget &&
            !checkIfTheGameEnded(
              gridPlayer,
              gridOpponent,
              playerFilledCells,
              opponentFilledCells
            )[0]
            ) {
            while (countOfShotsOnTarget == 0) {
              var randomRowOpponent = getRandomInt(0, 9);
              var randomColOpponent = getRandomInt(0, 9);
              itemOpponent = [randomRowOpponent, randomColOpponent];

              if (!isInArray(nodesHitInOrderForOpponent, itemOpponent)) {
                break;
              }
            }

            if (countOfShotsOnTarget > 0) {
              var case0 = false,
                case1 = false,
                case2 = false,
                case3 = false;
              while (true) {
                numbers = [0, 1, 2, 3];
                var randomNumber = numbers[getRandomInt(0, numbers.length - 1)];
                switch (randomNumber) {
                  case 0: // up
                    previousRandomRowOpponent -= countOfShotsOnTarget;
                    itemPlayer = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    case0 = true;
                    break;
                  case 1: // down
                    previousRandomRowOpponent += countOfShotsOnTarget;
                    itemPlayer = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    case1 = true;
                    break;
                  case 2: // right
                    previousRandomColOpponent += countOfShotsOnTarget;
                    itemPlayer = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    case2 = true;
                    break;
                  case 3: // left
                    previousRandomColOpponent -= countOfShotsOnTarget;
                    itemPlayer = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    case3 = true;
                    break;
                  default:
                    break;
                }
                if (case0 && case1 && case2 && case3) {
                  countOfShotsOnTarget = 0;
                  while (true) {
                    var randomRowOpponent = getRandomInt(0, 9);
                    var randomColOpponent = getRandomInt(0, 9);
                    itemOpponent = [randomRowOpponent, randomColOpponent];

                    if (!isInArray(nodesHitInOrderForOpponent, itemOpponent)) {
                      break;
                    }
                  }
                  break;
                } else if (
                  !isInRange(itemOpponent[0]) ||
                  !isInRange(itemOpponent[1])
                ) {
                  // pass
                } else if (
                  !isInArray(nodesHitInOrderForOpponent, itemOpponent)
                ) {
                  break;
                }
              }
            }

            if (isInArray(opponentFilledCells, itemOpponent)) {
              var isShotOnTarget = true;

              if (countOfShotsOnTarget > 0) {
                gridOpponent[itemOpponent[0]][itemOpponent[1]].isHit = true;

                shipIdCountForOpponent.set(
                  gridOpponent[itemOpponent[0]][itemOpponent[1]].shipId,
                  shipIdCountForOpponent.get(
                    gridOpponent[itemOpponent[0]][itemOpponent[1]].shipId
                  ) + 1
                );

                checkIfTheShipSankVar = checkIfTheShipSank(
                  shipIdCountForOpponent,
                  "opponent"
                );

                if (checkIfTheShipSankVar[0]) {
                  hits.push([
                    itemOpponent[0],
                    itemOpponent[1],
                    "opponent",
                    1,
                    1,
                    checkIfTheShipSankVar[1],
                  ]);
                } else {
                  hits.push([
                    itemOpponent[0],
                    itemOpponent[1],
                    "opponent",
                    1,
                    0,
                    "",
                  ]);
                }
              } else {
                gridOpponent[randomRowOpponent][randomColOpponent].isHit = true;

                shipIdCountForOpponent.set(
                  gridOpponent[randomRowOpponent][randomColOpponent].shipId,
                  shipIdCountForOpponent.get(
                    gridOpponent[randomRowOpponent][randomColOpponent].shipId
                  ) + 1
                );

                checkIfTheShipSankVar = checkIfTheShipSank(
                  shipIdCountForOpponent,
                  "opponent"
                );

                if (checkIfTheShipSankVar[0]) {
                  hits.push([
                    randomRowOpponent,
                    randomColOpponent,
                    "opponent",
                    1,
                    1,
                    checkIfTheShipSankVar[1],
                  ]);
                } else {
                  hits.push([
                    randomRowOpponent,
                    randomColOpponent,
                    "opponent",
                    1,
                    0,
                    "",
                  ]);
                }

                previousRandomRowPlayer = randomRowPlayer;
                previousRandomColPlayer = randomColPlayer;
              }

              countOfShotsOnTarget++;

              nodesHitInOrderForOpponent.push(itemOpponent);
              shipHitOpponent.push(itemOpponent);
            } else {
              if (countOfShotsOnTarget > 0) {
                isShotOnTarget = false;
                countOfShotsOnTarget = 0;
                gridOpponent[itemOpponent[0]][itemOpponent[1]].missed = true;
                nodesHitInOrderForOpponent.push(itemOpponent);
                hits.push([
                  itemOpponent[0],
                  itemOpponent[1],
                  "opponent",
                  0,
                  0,
                  0,
                  "",
                ]);
              } else {
                isShotOnTarget = false;
                countOfShotsOnTarget = 0;
                gridOpponent[randomRowOpponent][
                  randomColOpponent
                  ].missed = true;
                nodesHitInOrderForOpponent.push(itemOpponent);
                hits.push([
                  randomRowOpponent,
                  randomColOpponent,
                  "opponent",
                  0,
                  0,
                  0,
                  "",
                ]);
              }
            }
          }
          break;

        case "hard":
          var previousRandomRowOpponent;
          var previousRandomColOpponent;
          var countOfShotsOnTarget = 0;
          var itemOpponent;
          var direction;

          while (
            isShotOnTarget &&
            !checkIfTheGameEnded(
              gridPlayer,
              gridOpponent,
              playerFilledCells,
              opponentFilledCells
            )[0]
            ) {
            while (countOfShotsOnTarget == 0) {
              var randomNumber = getRandomInt(0, 3);

              switch (randomNumber) {
                case 0:
                  var randomRowOpponent = getRandomInt(0, 9);
                  var randomColOpponent = getRandomInt(0, 9);
                  itemOpponent = [randomRowOpponent, randomColOpponent];
                  break;
                case 1:
                  var randomIndex = getRandomInt(
                    0,
                    opponentFilledCells.length - 1
                  );
                  var randomRowOpponent = opponentFilledCells[randomIndex][0];
                  var randomColOpponent = opponentFilledCells[randomIndex][1];
                  itemOpponent = [randomRowOpponent, randomColOpponent];
                  break;
                case 2:
                  var randomRowOpponent = getRandomInt(0, 9);
                  var randomColOpponent = getRandomInt(0, 9);
                  itemOpponent = [randomRowOpponent, randomColOpponent];
                  break;
                case 3:
                  var randomRowOpponent = getRandomInt(0, 9);
                  var randomColOpponent = getRandomInt(0, 9);
                  itemOpponent = [randomRowOpponent, randomColOpponent];
                  break;
                default:
                  break;
              }

              if (!isInArray(nodesHitInOrderForOpponent, itemOpponent)) {
                break;
              }
            }

            if (countOfShotsOnTarget > 0) {
              var isDirectionValid = true;
              var case0 = false,
                case1 = false,
                case2 = false,
                case3 = false;
              while (isDirectionValid) {
                switch (direction) {
                  case "up":
                    case0 = true;
                    previousRandomRowOpponent -= 1;
                    itemOpponent = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    break;
                  case "down":
                    case1 = true;
                    previousRandomRowOpponent += 1;
                    itemOpponent = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    break;
                  case "right":
                    case2 = true;
                    previousRandomColOpponent += 1;
                    itemOpponent = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    break;
                  case "left":
                    case3 = true;
                    previousRandomColOpponent -= 1;
                    itemOpponent = [
                      previousRandomRowOpponent,
                      previousRandomColOpponent,
                    ];
                    break;

                  default:
                    break;
                }

                if (case0 && case1 && case2 && case3) {
                  countOfShotsOnTarget = 0;
                  while (true) {
                    var randomNumber = getRandomInt(0, 2);

                    switch (randomNumber) {
                      case 0:
                        var randomRowOpponent = getRandomInt(0, 9);
                        var randomColOpponent = getRandomInt(0, 9);
                        itemOpponent = [randomRowOpponent, randomColOpponent];
                        break;
                      case 1:
                        var randomIndex = getRandomInt(
                          0,
                          opponentFilledCells.length
                        );
                        var randomRowOpponent =
                          opponentFilledCells[randomIndex][0];
                        var randomColOpponent =
                          opponentFilledCells[randomIndex][1];
                        itemOpponent = [randomRowOpponent, randomColOpponent];
                        break;
                      case 2:
                        var randomRowOpponent = getRandomInt(0, 9);
                        var randomColOpponent = getRandomInt(0, 9);
                        itemOpponent = [randomRowOpponent, randomColOpponent];
                        break;
                      default:
                        break;
                    }

                    if (!isInArray(nodesHitInOrderForOpponent, itemOpponent)) {
                      break;
                    }
                  }
                  break;
                } else if (
                  !isInRange(itemOpponent[0]) ||
                  !isInRange(itemOpponent[1])
                ) {
                  // pass
                  direction = getOppositeDirection(direction);
                } else if (
                  !isInArray(nodesHitInOrderForOpponent, itemOpponent)
                ) {
                  break;
                }
              }
            }

            if (isInArray(opponentFilledCells, itemOpponent)) {
              var isShotOnTarget = true;

              if (countOfShotsOnTarget > 0) {
                gridOpponent[itemOpponent[0]][itemOpponent[1]].isHit = true;

                shipIdCountForOpponent.set(
                  gridOpponent[itemOpponent[0]][itemOpponent[1]].shipId,
                  shipIdCountForOpponent.get(
                    gridOpponent[itemOpponent[0]][itemOpponent[1]].shipId
                  ) + 1
                );

                checkIfTheShipSankVar = checkIfTheShipSank(
                  shipIdCountForOpponent,
                  "opponent"
                );

                if (checkIfTheShipSankVar[0]) {
                  hits.push([
                    itemOpponent[0],
                    itemOpponent[1],
                    "opponent",
                    1,
                    1,
                    checkIfTheShipSankVar[1],
                  ]);
                } else {
                  hits.push([
                    itemOpponent[0],
                    itemOpponent[1],
                    "opponent",
                    1,
                    0,
                    "",
                  ]);
                }
              } else {
                gridOpponent[randomRowOpponent][randomColOpponent].isHit = true;

                shipIdCountForOpponent.set(
                  gridOpponent[randomRowOpponent][randomColOpponent].shipId,
                  shipIdCountForOpponent.get(
                    gridOpponent[randomRowOpponent][randomColOpponent].shipId
                  ) + 1
                );

                checkIfTheShipSankVar = checkIfTheShipSank(
                  shipIdCountForOpponent,
                  "opponent"
                );

                if (checkIfTheShipSankVar[0]) {
                  hits.push([
                    randomRowOpponent,
                    randomColOpponent,
                    "opponent",
                    1,
                    1,
                    checkIfTheShipSankVar[1],
                  ]);
                } else {
                  hits.push([
                    randomRowOpponent,
                    randomColOpponent,
                    "opponent",
                    1,
                    0,
                    "",
                  ]);
                }

                direction =
                  gridOpponent[randomRowOpponent][randomColOpponent].direction;
                previousRandomRowOpponent = randomRowOpponent;
                previousRandomColOpponent = randomColOpponent;
              }

              countOfShotsOnTarget++;

              if (checkIfTheShipSankVar[0]) {
                countOfShotsOnTarget = 0;
              }

              nodesHitInOrderForOpponent.push(itemOpponent);
              shipHitOpponent.push(itemOpponent);
            } else {
              isShotOnTarget = false;

              if (countOfShotsOnTarget > 0) {
                isShotOnTarget = false;
                countOfShotsOnTarget = 0;
                gridOpponent[itemOpponent[0]][itemOpponent[1]].missed = true;
                nodesHitInOrderForOpponent.push(itemOpponent);
                hits.push([
                  itemOpponent[0],
                  itemOpponent[1],
                  "opponent",
                  0,
                  0,
                  "",
                ]);
              } else {
                isShotOnTarget = false;
                countOfShotsOnTarget = 0;
                gridOpponent[randomRowOpponent][
                  randomColOpponent
                  ].missed = true;
                nodesHitInOrderForOpponent.push(itemOpponent);
                hits.push([
                  randomRowOpponent,
                  randomColOpponent,
                  "opponent",
                  0,
                  0,
                  "",
                ]);
              }

              nodesHitInOrderForOpponent.push(itemOpponent);
            }
          }
          break;

        default:
          break;
      }
    }
  }

  return [
    gridPlayer,
    gridOpponent,
    nodesHitInOrderForPlayer,
    nodesHitInOrderForOpponent,
    shipHitPlayer,
    shipHitOpponent,
    didPlayerHit,
    didOpponentHit,
    hits,
  ];
}

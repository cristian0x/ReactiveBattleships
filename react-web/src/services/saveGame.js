import axios from "axios";

export const saveGame = async (gameMovesInOrder) => {
  try {
    await axios.post("http://localhost:8080/user/savedGames/add", {
      firstPlayerId: "1", // for test purposes
      secondPlayerId: "2", // for test purposes
      savedMoves: gameMovesInOrder.toString(),
      savedBy: "test@test.pl" // for test purposes
    })
  } catch(error) {
    console.log(error.response.data)
  }
}
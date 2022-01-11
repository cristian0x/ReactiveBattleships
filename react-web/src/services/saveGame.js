import axios from "axios";

export const saveGame = async (player1Data, player2Data, gameMovesInOrder) => {
  try {
    await axios.post("http://localhost:8080/user/savedGames/add", {
      firstPlayerId: player1Data[0].id,
      secondPlayerId: player2Data[0].id,
      savedMoves: gameMovesInOrder.toString(),
      savedBy: player1Data[0].email,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

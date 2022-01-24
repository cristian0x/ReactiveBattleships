import axios from "axios";

export const saveGameAi = async (gameMovesInOrder, token) => {
  try {
    await axios.post(
      "http://localhost:8080/user/savedGames/add",
      {
        firstPlayerId: 1000,
        secondPlayerId: 1001,
        savedMoves: JSON.stringify(gameMovesInOrder),
        savedBy: "ai@ai.com"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
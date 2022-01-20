import axios from "axios";

export const saveGame = async (player1Data, player2Data, gameMovesInOrder) => {

  const token = sessionStorage.getItem(player1Data[0].email);

  try {
    await axios.post(
      "http://localhost:8080/user/savedGames/add",
      {
        firstPlayerId: player1Data[0].id,
        secondPlayerId: player2Data[0].id,
        savedMoves: JSON.stringify(gameMovesInOrder),
        savedBy: player1Data[0].email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error.response.data);
  }
};

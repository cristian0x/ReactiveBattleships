import axios from "axios";

export const updatePlayer = async (email) => {

  const token = sessionStorage.getItem(email);
  try {
    await axios.post("http://localhost:8080/user/updateProfile", {
      email: email,
      isWin: 1,
      numberOfShots: 100,
      successfulHits: 20
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }

}
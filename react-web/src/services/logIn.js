import axios from "axios";

export const logIn = async (email, password, setPlayerData) => {

  try {
    const userData = await axios.post("http://localhost:8080/auth/login", {
      email: email,
      password: password,
    });
    setPlayerData([userData.data, true]);

  } catch (error) {
    console.log(error);
  }
}
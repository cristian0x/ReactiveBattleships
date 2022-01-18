import axios from "axios";

export const changePassword = async (email, login, oldPassword, newPassword) => {
  try {
    await axios.post("http://localhost:8080/user/updatePassword", {
      email: email,
      login: login,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  } catch (error) {

  }
}
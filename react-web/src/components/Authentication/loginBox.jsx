import React, { useState } from "react";
import "../../styles/login.css";
import { logIn } from "../../services/logIn";
import { getToken } from "../../services/getToken";

const LoginBox = ({ setPlayerData, playerData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (sessionStorage.getItem(email)) {
      alert("User already logged!");
      return;
    }
    await logIn(email, password, setPlayerData);
    const token = await getToken(email, password);
    if (!token.jwtToken) {
      setPlayerData({}, false);
      alert("Failed to authenticate user!");
      return;
    }
    sessionStorage.setItem(email, token.jwtToken);
  }

  function handleLogOut(e) {
    e.preventDefault();
    sessionStorage.removeItem(email);
    setEmail("");
    setPassword("");
    setPlayerData([{}, false]);
  }

  return (
    <form id="loginForm">
      {!playerData[1] ? (
        <>
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder="email"
            value={email}
            onChange={onEmailChange}
          />{" "}
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            value={password}
            onChange={onPasswordChange}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Log In"
            onClick={handleLogin}
          />
        </>
      ) : (
        <>
          {" "}
          <input
            disabled={true}
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder={playerData[0].email}
            value={email}
          />{" "}
          <input
            disabled={true}
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="*********"
            value={password}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Log out"
            onClick={handleLogOut}
          />
        </>
      )}
    </form>
  );
};

export default LoginBox;

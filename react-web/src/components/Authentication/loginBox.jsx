import React, { useState } from "react";
import "../../styles/login.css";
import {logIn} from "../../services/logIn";

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
    await logIn(email, password, setPlayerData)
  }

  function handleLogOut(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setPlayerData([{}, false]);
  }

  return (
    <form id="loginForm">
      <input
        type="text"
        id="email"
        className="fadeIn second"
        name="email"
        placeholder="email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        id="password"
        className="fadeIn third"
        name="password"
        placeholder="password"
        value={password}
        onChange={onPasswordChange}
      />
      {!playerData[1] ? (
        <input
          type="button"
          className="fadeIn fourth"
          value="Log In"
          onClick={handleLogin}
        />
      ) : (
        <input
          type="button"
          className="fadeIn fourth"
          value="Log out"
          onClick={handleLogOut}
        />
      )}
    </form>
  );
};

export default LoginBox;

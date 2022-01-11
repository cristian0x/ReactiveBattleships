import React, { useState } from "react";
import "../../styles/login.css";
import axios from "axios";
import {logIn} from "../../services/logIn";

const LoginBox = ({ setPlayerData, playerData }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function onLoginChange(e) {
    setLogin(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    await logIn(login, password, setPlayerData)
  }

  function handleLogOut(e) {
    e.preventDefault();
    setLogin("");
    setPassword("");
    setPlayerData([{}, false]);
  }

  return (
    <form id="loginForm">
      <input
        type="text"
        id="login"
        className="fadeIn second"
        name="login"
        placeholder="login"
        value={login}
        onChange={onLoginChange}
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

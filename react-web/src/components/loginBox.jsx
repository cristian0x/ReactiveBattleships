import React, { useState } from "react";
import "../styles/login.css";

const LoginBox = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function onLoginChange(e) {
    setLogin(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
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
      <input type="submit" className="fadeIn fourth" value="Log In" />
    </form>
  );
};

export default LoginBox;

import React from "react";
import { useState } from "react/cjs/react.development";
import "../../styles/login.css";

const RegisterBox = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLoginChange(e) {
    setLogin(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
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
        type="text"
        id="email"
        className="fadeIn third"
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
      <input type="submit" className="fadeIn fourth" value="Sign up" />
    </form>
  );
};

export default RegisterBox;

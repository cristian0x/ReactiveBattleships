import React from "react";
import { useState } from "react/cjs/react.development";
import "../../styles/login.css";

const RegisterBox = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function onLoginChange(e) {
    setLogin(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function onLastNameChange(e) {
    setLastName(e.target.value);
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
        type="text"
        id="firstName"
        className="fadeIn third"
        name="firstName"
        placeholder="first name"
        value={firstName}
        onChange={onFirstNameChange}
      />
      <input
        type="text"
        id="lastName"
        className="fadeIn third"
        name="lastName"
        placeholder="last name"
        value={lastName}
        onChange={onLastNameChange}
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

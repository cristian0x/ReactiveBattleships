import React, { useState } from "react";
import "../styles/login.css";
import LoginBox from "../components/Authentication/loginBox";
import RegisterBox from "../components/Authentication/registerBox";
import ForgotPasswordBox from "../components/Authentication/forgotPasswordBox";

const Authentication = ({ setPlayerData, playerData }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  function showLoginBox() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
  }

  function showRegisterBox() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(false);
  }

  function showForgotPasswordBox() {
    setIsForgotPasswordOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  }

  return (
      <div id="formContent">
        <button id="btns" onClick={showLoginBox} disabled={playerData[1]} >
          <h2 className={isLoginOpen ? "active" : "inactive underlineHover"}>
            {" "}
            Sign In{" "}
          </h2>
        </button>
        <button id="btns" onClick={showRegisterBox} disabled={playerData[1]}>
          <h2 className={isRegisterOpen ? "active" : "inactive underlineHover"}>
            {" "}
            Sign Up{" "}
          </h2>
        </button>
        <div className="fadeIn first"></div>

        {isLoginOpen && (
          <LoginBox
            setPlayerData={setPlayerData}
            playerData={playerData}
          />
        )}
        {isRegisterOpen && <RegisterBox />}
        {isForgotPasswordOpen && <ForgotPasswordBox />}

        {playerData[1] && (<div id="formFooter">
          <h2
            className={
              isForgotPasswordOpen ? "active" : "inactive underlineHover"
            }
            onClick={showForgotPasswordBox}
          >
            {" "}
            Change password{" "}
          </h2>
        </div> )}
      </div>
  );
};

export default Authentication;

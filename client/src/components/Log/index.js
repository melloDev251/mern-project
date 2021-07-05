import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if(e.target.id === "register") {
        setSignUpModal(true);
        setSignInModal(false);
    } else if(e.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
  } 
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li id="register" onClick={handleModals} className={signUpModal ? "active-btn" : null} >S'inscrire</li>
          <li id="login" onClick={handleModals} className={signInModal ? "active-btn" : null} >Se connecter</li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;

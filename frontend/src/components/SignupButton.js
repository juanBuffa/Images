import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => {
        loginWithRedirect({
          screen_hint: "signup",
        });
      }}
      className="btn btn-light"
      style={{marginTop:"1rem"}}
    >
      Crear cuenta
    </button>
  );
};

export default SignupButton;

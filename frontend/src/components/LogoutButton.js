import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="btn btn-dark"
      style={{ width: "100%", height: "2.5rem" }}
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;

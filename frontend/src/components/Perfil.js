import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div id="profile">
        <p style={{margin:"1rem",marginLeft:"0rem"}}>{user.email}</p>
        <img src={user.picture} alt={user.name} style={{ maxWidth: "3rem",objectFit:"contain",alignSelf:"start", marginTop:"0.5rem",marginRight:"0.5rem", borderStyle:"inset",borderWidth:"5px", borderRadius:"50%"}} />
      </div>
    )
  );
};

export default Perfil;

import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

function Inicio() {
  return (
    <div id="welcome">
      <h1 style={{marginBottom:"5rem", textAlign:"center"}}>Un lugar para guardar tus imagenes</h1>
      <LoginButton />
      <SignupButton />
    </div>
  );
}

export default Inicio;

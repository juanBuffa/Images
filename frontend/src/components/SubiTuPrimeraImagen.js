import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function SubiTuPrimeraImagen() {
  return (
    <Link to="/subir" style={{width:"fit-content", height:"fit-content"}}>
      <Button
        style={{
          width: "12rem",
          height: "fit-content",
          margin: "2rem",
          color: "white",
        }}
      >
        Subí tu primer imagen
      </Button>
    </Link>
  );
}

export default SubiTuPrimeraImagen;

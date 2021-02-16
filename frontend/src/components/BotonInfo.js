import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsInfoSquare } from "react-icons/bs";
import Popup from "reactjs-popup";

function BotonInfo(props) {
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    let date = new Date(props.fecha);
    setFecha(date.toLocaleDateString() + " " + date.toLocaleTimeString());
  }, []);

  return (
    <Popup
      trigger={
        <Button variant="primary" className="boton-popUp">
          Información
          <BsInfoSquare
            style={{ marginLeft: "0.3rem", marginTop:"0.3rem"}}
          />
        </Button>
      }
      modal
      nested
    >
      <div style={{maxWidth:"80vw"}}>
        <span style={{ display: "flex", overflow: "auto" }}>
          <b>nombre:</b> {props.nombre}
        </span>
        <p>
          <b>fecha de subida:</b> {fecha}
        </p>
      </div>
    </Popup>
  );
}

export default BotonInfo;

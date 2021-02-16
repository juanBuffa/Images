import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import Loading from "./Loading";
import { BsTrash } from "react-icons/bs";
import Popup from "reactjs-popup";

function BotonBorrar(props) {
  const [borrando, setBorrando] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const borrarImagen = (close) => {
    setBorrando(true);
    close();
    const url = `${process.env.REACT_APP_BACKEND_API}/api/imagen/eliminar?nombre=${props.nombre}`;
    getAccessTokenSilently().then((token) => {
      fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          setBorrando(false);
          props.alBorrar(props.nombre);
          props.closePopUp();
        })
        .catch((error) => console.log("Error al subir el archivo: " + error));
    });
  };

  return (
    <Popup
      trigger={
        <Button variant="danger" className="boton-popUp">
          {borrando ? (
            <Loading />
          ) : (
            <>
              Eliminar
              <BsTrash style={{marginLeft:"0.1rem", marginTop:"0.3rem"}}/>
            </>
          )}
        </Button>
      }
      modal
      nested
    >
      {(close) => (
        <div style={{ padding: "0.5rem" }}>
          Desea eliminar esta foto?
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "1rem",
            }}
          >
            <Button variant="danger" onClick={() => borrarImagen(close)}>
              si
            </Button>
            <Button variant="secondary" onClick={close}>
              no
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
}
export default BotonBorrar;

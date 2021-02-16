import Popup from "reactjs-popup";
import Imagen from "./Imagen";
import BotonBorrar from "./BotonBorrar";
import BotonDescarga from "./BotonDescarga";
import BotonInfo from "./BotonInfo";

const PopUpImagen = (props) => {
  return (
    <Popup
      trigger={
        <div className="popUp-trigger">
          <div className="imagen-container">
            <Imagen imag={props.url} className="imagen" nombre={props.nombre} />
          </div>
        </div>
      }
      modal
      nested
    >
      {(close) => (
        <div className="popUp-div">
          <Imagen
            imag={props.url}
            className="imagen-popUp"
            nombre={props.nombre}
          />
          <div className="botones-seguros">
            <BotonInfo nombre={props.nombre} fecha={props.fecha} />
            <BotonDescarga url={props.url} />
          </div>
          <BotonBorrar
            nombre={props.nombre}
            alBorrar={props.alBorrarImagen}
            closePopUp={close}
          />
        </div>
      )}
    </Popup>
  );
};

export default PopUpImagen;

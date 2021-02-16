import {Button} from 'react-bootstrap';
import {BiCloudDownload} from 'react-icons/bi';

function BotonDescarga(props) {
  return (
    <a href={props.url} download className="boton-popUp">
      <Button variant="warning" id="boton-descarga">
        Descargar
        <BiCloudDownload style={{marginLeft:"0.1rem"}}/>
      </Button>
    </a>
  );
}

export default BotonDescarga;

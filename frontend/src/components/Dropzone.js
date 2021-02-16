import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BiImageAdd } from "react-icons/bi";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

function Dropzone() {
  const { getAccessTokenSilently } = useAuth0();

  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [subiendoProps, setSubiendoProps] = useState(null);
  const [resultado, setResultado] = useState("");
  const [acceptedFile, setAcceptedFile] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    let file = acceptedFiles[0];
    if (!(file instanceof Blob)) {
      setResultado("Seleccione solo 1(Una) imagen");
      return;
    }
    let read = new FileReader();
    read.readAsDataURL(file);
    read.onloadend = function () {
      setImagen(read.result);
    };
    setAcceptedFile(file);
    setNombre(file.path.split(".")[0]);
    setResultado("");
  }, []);

  const post = (file) => {
    setResultado("");
    if (nombre === "") {
      setResultado("Tenés que ponerle un nombre");
      return;
    }
    if (!(file instanceof Blob)) {
      setResultado("Seleccioná 1(Una) imagen");
      return;
    }
    setSubiendoProps({ onClick: () => null, onMouseOver: () => null });
    const formData = new FormData();
    formData.append("file", file);
    const url = `${process.env.REACT_APP_BACKEND_API}/api/imagen/subir?nombre=${nombre}`;
    getAccessTokenSilently().then((token) => {
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => {
          res.text().then((data) => {
            setResultado(data);
            setSubiendoProps(null);
            if (!data.startsWith("Ya existe un archivo ")) {
              setImagen(null);
              setAcceptedFile(null);
              setNombre("");
            }
          });
        })
        .catch((error) => setResultado("Error: " + error));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: "true",
    accept: "image/jpeg, image/png, image/gif",
    maxFiles: 1,
  });

  const actualizar = (event) => {
    setNombre(event.target.value);
  };

  return (
    <div id="dropzone">
      {imagen !== null ? (
        <img src={imagen} className="imagen-subida" alt="imagen"></img>
      ) : null}
      <Button
        variant
        {...getRootProps()}
        style={{ marginTop: "1rem" }}
        {...subiendoProps}
      >
        <input {...getInputProps()} />
        <BiImageAdd style={{ width: "5rem", height: "5rem" }} />
      </Button>
      <input
        onChange={actualizar}
        value={nombre}
        style={{ marginTop: "1rem" }}
        placeholder="Nombrá la imagen"
      />
      <Button
        variant="success"
        onClick={() => post(acceptedFile)}
        style={{ marginTop: "1rem" }}
      >
        Subir
      </Button>
      {subiendoProps !== null ? (
        <Loading className="cargando-subiendo" />
      ) : null}
      <p style={{ marginTop: "1rem", maxWidth:"80%", textAlign:"center"}}>{resultado}</p>
    </div>
  );
}

export default Dropzone;

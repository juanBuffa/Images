import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Header from "./Header";
import "reactjs-popup/dist/index.css";
import Loading from "./Loading";
import PopUpImagen from "./PopUpImagen";
import SubiTuPrimeraImagen from "./SubiTuPrimeraImagen";

function ZonaImagenes() {
  const [imagenes, setImagenes] = useState(null);

  const { isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      fetch(`${process.env.REACT_APP_BACKEND_API}/api/imagenes/descargar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setImagenes(data);
        })
        .catch((err) => console.log(err));
    });
  }, [getAccessTokenSilently]);

  const actualizarDespuesDeBorrar = (nombre) => {
    setImagenes(imagenes.filter((imagen) => imagen.nombre !== nombre));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="zona-imagenes">
      <Header />
      {imagenes !== null ? (
        imagenes[0] === undefined ? (
          <SubiTuPrimeraImagen />
        ) : (
          <div id="imagenes">
            {imagenes.map((imagen, key) => (
              <React.Fragment key={key}>
                <PopUpImagen
                  url={imagen.url}
                  nombre={imagen.nombre}
                  fecha={imagen.fechaCreacion}
                  alBorrarImagen={actualizarDespuesDeBorrar}
                />
              </React.Fragment>
            ))}
          </div>
        )
      ) : (
        <Loading className="cargando-pantalla" />
      )}
    </div>
  );
}

export default ZonaImagenes;

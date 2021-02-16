import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import SubirImagen from "./components/SubirImagen";
import ZonaImagenes from "./components/ZonaImagenes";

function App() {
  const { isLoading,isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading className="cargando-pantalla"/>;
  }

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {isAuthenticated ? <Redirect to="/mis-imagenes" /> : <Inicio />}
        </Route>
        <ProtectedRoute path="/mis-imagenes" component={ZonaImagenes} />
        <ProtectedRoute path="/subir" component={SubirImagen} />
      </Switch>
    </div>
  );
}

export default App;

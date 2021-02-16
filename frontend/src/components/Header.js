import LogoutButton from "./LogoutButton";
import Perfil from "./Perfil";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function MenuCustom() {
  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>
        <Link
          to="/mis-imagenes"
          style={{ color: "black", marginRight: "1rem" }}
        >
          Mis Imagenes
        </Link>
        <hr />
      </MenuItem>
      <MenuItem>
        <Link to="/subir" style={{ color: "black" }}>
          Subir Imagen
        </Link>
      </MenuItem>
      <MenuItem>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
}

function Header() {
  return (
    <div id="header">
      <div id="menu">
        <MenuCustom />
      </div>
      <Perfil />
    </div>
  );
}

export default Header;

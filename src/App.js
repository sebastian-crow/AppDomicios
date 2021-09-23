import React from "react";
import { Switch } from "react-router-dom"; // Librería react-router-dom

//Vistas
import Inicio from "./components/vistas/Inicio";
import UserMap from "./components/vistas/UserMap";

//Servicios de authenticacion
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditarUsuario from "./components/auth/EditarUsuario";

// Users
import ListUsers from "./components/listUsers/ListUsers";

//Elementos de rutas
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import "./assets/css/home.css";
import MenuBar from "./components/base/MenuBar";
import Footer from "./components/base/Footer";
import { useDispatch } from "react-redux";
import { restoreSessionStateAction } from "./store/reducer";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // on app start, restore state stored from local/session storage
    dispatch(restoreSessionStateAction());
  }, [dispatch]);
  return (
    <>
      <MenuBar />
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={Inicio} />
          <PrivateRoute path="/listusers" component={ListUsers} />
          <PrivateRoute path="/mapuser/:id" component={UserMap} />
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute
            restricted={true}
            path="/register"
            component={Register}
          />
          <PrivateRoute path="/editarusuario" component={EditarUsuario} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;

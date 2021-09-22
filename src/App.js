import React from "react";
import { Switch } from "react-router-dom"; // Librería react-router-dom

//Vistas
import Inicio from "./components/vistas/Inicio";

//Servicios de authenticacion
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute
            restricted={true}
            path="/register"
            component={Register}
          />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;

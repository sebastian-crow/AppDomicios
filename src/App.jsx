/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
import React from "react";
import { Router } from "react-router";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom"; // Librería react-router-dom
import { push } from "redux-first-history";
import { createBrowserHistory } from "history";

// Store and history
import { store, history } from "./store/configureStore";

// Cookies Session
import Cookies from "js-cookie";
import { SessionContext, getSessionCookie, setSessionCookie } from "./session";

// CSS
import "./assets/css/home.css";

import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "layouts/Admin";
import NoAuth from "layouts/NoAuth";
import { restoreSessionStateAction, saveUrlPushAction } from "./store/reducer";
import Login from "./components/addresses/auth/Login";
import Register from "./components/addresses/auth/Register";
import routesCliente from "./routes/routesCliente";
import routesAdmin from "./routes/routesAdmin";
import routesDomiciliario from "./routes/routesDomiciliario";
import defaultRoutes from "./routes/defaultRoutes";

function App(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.usuario.user);
  //const position = useSelector((state) => state.login.usuario.user);

  React.useEffect(() => {
    if (!user) {
      const userSessionInfo = getSessionCookie();
      console.log(userSessionInfo);
      if (Object.keys(userSessionInfo).length) {
        dispatch(restoreSessionStateAction());
      } else {
        dispatch(push("/login"));
      }
    }
  }, []);

  return (
    <>
      <Router history={history}>
        <div>
          <Switch>
            {/**
             * Heredas las rutas atraves de este middleware, y
             * puedes cambiar el layout para diferentes vistas
             * como puedes poner una plantilla para ventas y otra para administracion entre otras
             */}
            <Route
              path="/admin"
              render={(props) => (
                <AdminLayout {...props} routes={routesAdmin} />
              )}
            />
            <Route
              path="/domiciliario"
              render={(props) => (
                <AdminLayout {...props} routes={routesDomiciliario} />
              )}
            />
            <Route
              path="/cliente"
              render={(props) => (
                <AdminLayout {...props} routes={routesCliente} />
              )}
            />
            <Route
              restricted
              path="/clienteForm"
              render={(props) => <NoAuth {...props} routes={routesCliente} />}
            />

            <Route
              path="/user"
              render={(props) => <NoAuth {...props} routes={defaultRoutes} />}
            />
            
            <Route restricted path="/login" component={Login} />
            <Route restricted path="/register" component={Register} />
            <Route
              path="/whatsappNotification"
              component={() => {
                window.location.href =
                  "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+metal-cell&app_absent=0";
                window.location.target = "_blank";
                return null;
              }}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

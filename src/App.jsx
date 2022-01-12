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

function App() {
  const [session, setSession] = React.useState(getSessionCookie());
  const currentSession = React.useContext(SessionContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.usuario.user);
  //const position = useSelector((state) => state.login.usuario.user);
  const userSessionInfo = getSessionCookie();
  const localstore = JSON.parse(localStorage.getItem("store"));
  React.useEffect(() => {
    if (!user) {
      dispatch(push("/login"));
    }
    //   on app start, restore state stored from local/session storage
    if (!localstore) {
      //dispatch(restoreSessionStateAction());
      dispatch(saveSessionStateAction());
    } else {
      var webPush = localStorage.getItem("webpush");
      var webPush = JSON.parse(webPush);
      dispatch(
        saveUrlPushAction({
          userId: userSessionInfo.user?.id,
          urlPush: JSON.stringify(webPush),
        })
      );
    }
  }, []);

  React.useEffect(() => {
    setSession(getSessionCookie());
  }, []);

  return (
    <>
      <SessionContext.Provider value={session}>
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
              {userSessionInfo.userCookie?.rol === "cliente" && (
                <Redirect to="/cliente/dashboard" />
              )}
              {userSessionInfo.userCookie?.rol === "admin" && (
                <Redirect to="/admin/dashboard" />
              )}
              {userSessionInfo.userCookie?.rol === "domiciliario" && (
                <Redirect to="/domiciliario/dashboard" />
              )}
            </Switch>
          </div>
        </Router>
      </SessionContext.Provider>
    </>
  );
}

export default App;

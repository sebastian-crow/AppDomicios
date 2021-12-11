/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Librería react-router-dom
import { push } from 'redux-first-history';
``
// CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import './assets/css/home.css';

import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'layouts/Admin';
import NoAuth from 'layouts/NoAuth';
import { restoreSessionStateAction } from './store/reducer';
import Login from './components/addresses/auth/Login';
import Register from './components/addresses/auth/Register';
import routesCliente from './routes/routesCliente';
import routesAdmin from './routes/routesAdmin';
import routesDomiciliario from './routes/routesDomiciliario';

import defaultRoutes from './routes/defaultRoutes';

async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.usuario.user);
  React.useEffect(async () => {
    // on app start, restore state stored from local/session storage
    dispatch(restoreSessionStateAction());
    if (!user) {
      dispatch(push('/login'));
    } else {
      const urlPush = await createNotificationSubscription();
      dispatch(saveUrlPushAction({userId: user.id, urlPush}));
      console.log(urlPush);
    }
  }, [dispatch, user]);

  return (
    <>
      <div>
        <Switch>
          {/**
           * Heredas las rutas atraves de este middleware, y
           * puedes cambiar el layout para diferentes vistas
           * como puedes poner una plantilla para ventas y otra para administracion entre otras
           */}
          <Route
            path="/admin"
            render={(props) => <AdminLayout {...props} routes={routesAdmin} />}
          />
          <Route
            path="/domiciliario"
            render={(props) => <AdminLayout {...props} routes={routesDomiciliario} />}
          />
          <Route
            path="/cliente"
            render={(props) => <AdminLayout {...props} routes={routesCliente} />}
          />
          <Route
            path="/user"
            render={(props) => <NoAuth {...props} routes={defaultRoutes} />}
          />
          <Route restricted path="/login" component={Login} />
          <Route restricted path="/register" component={Register} />

          {user?.rol === 'cliente' && (
            <Redirect to="/cliente/dashboard" />
          )}
          {user?.rol === 'admin' && (
            <Redirect to="/admin/dashboard" />
          )}
          {user?.rol === 'domiciliario' && (
            <Redirect to="/domiciliario/dashboard" />
          )}
        </Switch>
      </div>
    </>
  );
}

export default App;


/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Librería react-router-dom
import { push } from 'redux-first-history';
import './assets/css/home.css';

import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'layouts/Admin';
import NoAuth from 'layouts/NoAuth';
import { restoreSessionStateAction } from './store/reducer';
import Login from './components/addresses/auth/Login';
import Register from './components/addresses/auth/Register';
import routes from './routes/routes';
import defaultRoutes from './routes/defaultRoutes';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.usuario.user);
  React.useEffect(() => {
    // on app start, restore state stored from local/session storage
    dispatch(restoreSessionStateAction());
    if (!user) {
      dispatch(push('/login'));
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
            render={(props) => <AdminLayout {...props} routes={routes} />}
          />
          <Route
            path="/domiciliario"
            render={(props) => <AdminLayout {...props} routes={routes} />}
          />
          <Route
            path="/cliente"
            render={(props) => <AdminLayout {...props} routes={routes} />}
          />
          <Route
            path="/user"
            render={(props) => <NoAuth {...props} routes={defaultRoutes} />}
          />
          <Route restricted path="/login" component={Login} />
          <Route restricted path="/register" component={Register} />
          <Redirect to="/admin/dashboard" />
        </Switch>
      </div>
    </>
  );
}

export default App;

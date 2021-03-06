import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'; // Librería react-router-dom
import { push } from 'redux-first-history';
// Store and history
import { history } from './store/configureStore';
// Cookies Session
import { getSessionCookie } from './session';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './layouts/AdminLayout';
import NoAuth from './layouts/NoAuth';
import { restoreSessionStateAction } from './store/reducer';
import Login from './components/addresses/auth/Login';
import Register from './components/addresses/auth/Register';
import routesClient from './routes/routesClient';
import routesCompany from './routes/routesCompany';
import routesAdmin from './routes/routesAdmin';
import routesDomiciliary from './routes/routesDomiciliary';
import defaultRoutes from './routes/defaultRoutes';

// Take Order
import TakeOrder from './components/addresses/orders/TakeOrder';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const cookie = getSessionCookie();
  console.log('Cookie', cookie);

  React.useEffect(() => {
    if (!user) {
      const userSessionInfo = getSessionCookie();
      if (Object.keys(userSessionInfo).length) {
        dispatch(restoreSessionStateAction());
      } else {
        dispatch(push('/login'));
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
              path="/domiciliary"
              render={(props) => (
                <AdminLayout {...props} routes={routesDomiciliary} />
              )}
            />
            <Route
              path="/client"
              render={(props) => (
                <AdminLayout {...props} routes={routesClient} />
              )}
            />
            <Route
              path="/company"
              render={(props) => (
                <AdminLayout {...props} routes={routesCompany} />
              )}
            />
            <Route
              path="/user"
              render={(props) => (
                <NoAuth {...props} routes={defaultRoutes} />
              )}
            />
            /* Public route form */
            <Route
              //path="/tomarorden/:companyName/:idCompnay/:deliveryNumber/:purchaseNumber"
              path="/tomarorden"
            >
              <TakeOrder />
            </Route>
            <Route restricted path="/login" component={Login} />
            <Route restricted path="/register" component={Register} />
            <Route
              path="/whatsappNotification"
              component={() => {
                window.location.href =
                  'https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+metal-cell&app_absent=0';
                window.location.target = '_blank';
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

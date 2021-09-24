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
import TomarPedido from './components/pedidos/TomarPedido'
import Pedidos from './components/pedidos/Pedidos'

// Products
import Product from "./components/products/Product"
import CreateProduct from "./components/products/CreateProduct"
import EditProduct from "./components/products/EditProduct"
import ListProducts from "./components/products/ListProducts"



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
          <PrivateRoute path="/listproducts" component={ListProducts} />
          <PrivateRoute path="/createproduct" component={CreateProduct} />
          <PrivateRoute path="/tomarpedido" component={TomarPedido} />
          <PrivateRoute path="/pedidos" component={Pedidos} />
          <PrivateRoute path="/mapuser/:id" component={UserMap} />
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute
            restricted={true}
            path="/register"
            component={Register}
          />
          <PrivateRoute path="/editarusuario" component={EditarUsuario} />
          <PrivateRoute path="/editarproducto/:id" component={EditProduct} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;

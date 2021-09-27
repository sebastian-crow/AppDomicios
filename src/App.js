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
import ListClientes from "./components/listUsers/ListClientes";
import ListDomiciliarios from "./components/listUsers/ListDomiciliarios"


// Products
import Product from "./components/products/Product"
import CreateProduct from "./components/products/CreateProduct"
import EditProduct from "./components/products/EditProduct"
import ListProducts from "./components/products/ListProducts"

// Orders
import Orders from './components/orders/Orders'
import TakeOrder from './components/orders/TakeOrder'
import CreateOrder from './components/orders/CreateOrder'
import EditOrder from './components/orders/EditOrder'
import OrderList from './components/orders/OrderList'


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
          <PrivateRoute path="/listclientes" component={ListClientes} />
          <PrivateRoute path="/listdomiciliarios" component={ListDomiciliarios} />
          <PrivateRoute path="/listproducts" component={ListProducts} />
          <PrivateRoute path="/createproduct" component={CreateProduct} />


          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/takeorder" component={TakeOrder} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/orderlist" component={OrderList} />

          <PrivateRoute path="/createOrder" component={CreateOrder} />
          <PrivateRoute path="/editOrder/:id" component={EditOrder} />

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

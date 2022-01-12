import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";

// Users
import UserProductList from "../components/addresses/products/UserProductList";
import EditarUsuario from "../components/addresses/auth/EditarUsuario";

// Products
import CreateProduct from "../components/addresses/products/CreateProduct";
import ListProducts from "../components/addresses/products/UserProductList";
import EditProduct from "../components/addresses/products/EditProduct";

// Product Orders
import EditProductOrder from "../components/addresses/orders/productOrders/EditProductOrder";
import UserProductOrderList from "../components/addresses/orders/productOrders/UserProductOrderList";

// Delivery Orders
import TakeOrder from "../components/addresses/orders/TakeOrder";
import EditOrder from "../components/addresses/orders/EditOrder";
import UserOrderList from "../components/addresses/orders/UserOrderList";

// Map
import { Map } from "../components/addresses/maps/map/client/Map";
import { MapSelectUbication } from "../components/addresses/orders/lib/MapSelectUbication";

// Google Sheets Connection
import { GoogleSheetsConnect } from "../components/addresses/excel/googleSheetsConnect";

var routesCliente = [
  // Orders
  {
    path: "/pedidos",
    rol: ["cliente"],
    name: "Listar Pedidos",
    icon: "nc-icon nc-cart-simple",
    component: UserProductOrderList,
    layout: "/cliente",
    visible: true,
  },
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["cliente"],
    component: UserOrderList,
    layout: "/cliente",
    visible: true,
  },
  {
    path: "/takeorder/:orderNumberSheets/:userid",
    name: "Cordinar Entrega",
    icon: "nc-icon nc-cart-simple",
    rol: ["cliente"],
    component: TakeOrder,
    layout: "/cliente",
    visible: false,
  },
  {
    path: "/editorder/:id",
    name: "Edit Order",
    icon: "nc-icon nc-bank",
    rol: ["cliente"],
    component: EditOrder,
    layout: "/cliente",
    visible: false,
  },
  // Maps
  {
    path: "/clientmap/:id",
    name: "Client Map",
    rol: ["cliente"],
    component: Map,
    layout: "/cliente",
    visible: false,
  },

  // User's Pages
  {
    path: "/user-page",
    rol: ["cliente"],
    name: "Editar usuario",
    icon: "nc-icon nc-single-02",
    component: EditarUsuario,
    layout: "/cliente",
    visible: true,
  },
  {
    path: "/googlesheetsconnection",
    rol: ["cliente"],
    name: "Google Sheets",
    icon: "nc-icon nc-single-02",
    component: GoogleSheetsConnect,
    layout: "/cliente",
    visible: true,
  },
  {
    path: "/clienteFormulario",
    rol: ["cliente"],
    name: "Order Form",
    icon: "nc-icon nc-single-02",
    component: TakeOrder,
    layout: "/clienteForm",
    visible: false,
  },
  {
    path: "/clienteFormulario",
    rol: ["cliente"],
    name: "Order Form",
    icon: "nc-icon nc-single-02",
    component: EditProductOrder,
    layout: "/clienteForm",
    visible: false,
  },
];
export default routesCliente;

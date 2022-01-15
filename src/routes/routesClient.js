import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";

import EditUser from "../components/addresses/auth/EditUser";

// Product Orders
import EditProductOrder from "../components/addresses/orders/productOrders/EditProductOrder";
import UserProductOrderList from "../components/addresses/orders/productOrders/UserProductOrderList";
import OrderList from "../components/addresses/orders/ListOrders";

// Delivery Orders
import TakeOrder from "../components/addresses/orders/TakeOrder";
import EditOrder from "../components/addresses/orders/EditOrder";

// Map
import { Map } from "../components/addresses/maps/map/client/Map";
import { MapSelectUbication } from "../components/addresses/orders/lib/MapSelectUbication";

// Google Sheets Connection
import { GoogleSheetsConnect } from "../components/addresses/excel/googleSheetsConnect";

var routesClient = [
  // Orders
  {
    path: "/pedidos",
    rol: ["client"],
    name: "Listar Pedidos",
    icon: "nc-icon nc-cart-simple",
    component: UserProductOrderList,
    layout: "/client",
    visible: true,
  },
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["client"],
    component: OrderList,
    layout: "/client",
    visible: true,
  },
  {
    path: "/takeorder/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient",
    name: "Cordinar Entrega",
    icon: "nc-icon nc-cart-simple",
    rol: ["client"],
    component: TakeOrder,
    layout: "/client",
    visible: false,
  },
  {
    path: "/editorder/:id",
    name: "Edit Order",
    icon: "nc-icon nc-bank",
    rol: ["client"],
    component: EditOrder,
    layout: "/client",
    visible: false,
  },
  // Maps
  {
    path: "/clientmap/:id",
    name: "Client Map",
    rol: ["client"],
    component: Map,
    layout: "/client",
    visible: false,
  },

  // User's Pages
  {
    path: "/user-page",
    rol: ["client"],
    name: "Editar user",
    icon: "nc-icon nc-single-02",
    component: EditUser,
    layout: "/client",
    visible: true,
  },
  {
    path: "/googlesheetsconnection",
    rol: ["client"],
    name: "Google Sheets",
    icon: "nc-icon nc-single-02",
    component: GoogleSheetsConnect,
    layout: "/client",
    visible: true,
  },
  {
    path: "/clientFormulario",
    rol: ["client"],
    name: "Order Form",
    icon: "nc-icon nc-single-02",
    component: TakeOrder,
    layout: "/clientForm",
    visible: false,
  },
  {
    path: "/clientFormulario",
    rol: ["client"],
    name: "Order Form",
    icon: "nc-icon nc-single-02",
    component: EditProductOrder,
    layout: "/clientForm",
    visible: false,
  },
];
export default routesClient;

import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";

// Users
import ListClientss from "../components/addresses/listUsers/ListClients";
import EditUser from "../components/addresses/auth/EditUser";

// Orders
import TakeOrder from "../components/addresses/orders/TakeOrder";
import OrderList from "../components/addresses/orders/ListOrders";

// Excel
import { Excel } from "../components/addresses/excel/Excel";

// Map
import { Map } from "../components/addresses/maps/map/admin/Map";

var routesAdmin = [
  // Default routes
  {
    path: "/dashboard",
    rol: ["admin"],
    name: "Dashboard",
    icon: "nc-icon nc-diamond",
    component: Dashboard,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/user-page",
    rol: ["admin"],
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: EditUser,
    layout: "/admin",
    visible: true,
  },
  // Auth routes
  {
    path: "/listclients",
    name: "Listar users",
    rol: ["admin"],
    icon: "nc-icon nc-single-02",
    component: ListClientss,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/takeorder",
    name: "Hacer un pedido",
    icon: "nc-icon nc-cart-simple",
    rol: ["admin"],
    component: TakeOrder,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["admin"],
    component: OrderList,
    layout: "/admin",
    visible: true,
  },
  // Maps
  {
    path: "/map/:id",
    name: "Client Map",
    rol: ["admin"],
    component: Map,
    layout: "/admin",
    visible: false,
  },
  // Import Excell Data
  {
    path: "/importexceldata",
    name: "Excel",
    icon: "nc-icon nc-bank",
    rol: ["admin"],
    component: Excel,
    layout: "/admin",
    visible: true,
  },
];
export default routesAdmin;

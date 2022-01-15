// Orders
import OrderList from "../components/addresses/orders/ListOrders";
import UserPage from "views/User.js";
import EditUser from "../components/addresses/auth/EditUser";

// Maps
import  { Map } from "../components/addresses/maps/map/Map";

var routesDomiciliary = [
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["domiciliary"],
    component: OrderList,
    layout: "/domiciliary",
    visible: true,
  },
  // Maps
  {
    path: "/dealermap/:id",
    rol: ["domiciliary"],
    name: "Dealer map",
    icon: "nc-icon nc-pin-3",
    component: Map,
    layout: "/domiciliary",
    visible: false,
  },
  {
    path: "/user-page",
    rol: ["domiciliary"],
    name: "Editar user",
    icon: "nc-icon nc-single-02",
    component: EditUser,
    layout: "/domiciliary",
    visible: true,
  },
];
export default routesDomiciliary;

// Orders
import OrderList from "../components/addresses/orders/OrderList";
import UserPage from "views/User.js";
import EditarUsuario from "../components/addresses/auth/EditarUsuario";

// Maps
import  { Map } from "../components/addresses/maps/map/Map";

var routesDomiciliario = [
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["domiciliario"],
    component: OrderList,
    layout: "/domiciliario",
    visible: true,
  },
  // Maps
  {
    path: "/dealermap/:id",
    rol: ["domiciliario"],
    name: "Dealer map",
    icon: "nc-icon nc-pin-3",
    //component: DealerMapProof,
    //component: DealerMapAgainProof,
    component: Map,
    layout: "/domiciliario",
    visible: false,
  },
  {
    path: "/user-page",
    rol: ["domiciliario"],
    name: "Editar usuario",
    icon: "nc-icon nc-single-02",
    component: EditarUsuario,
    layout: "/domiciliario",
    visible: true,
  },
];
export default routesDomiciliario;

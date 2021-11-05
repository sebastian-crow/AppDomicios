// Orders
import OrderList from "../components/addresses/orders/OrderList";
import UserPage from "views/User.js";
// Maps
import { DealerMap } from "../components/addresses/maps/mapbox/DealerMap";

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
    component: DealerMap,
    layout: "/domiciliario",
    visible: false,
  },
  {
    path: "/user-page",
    rol: ["domiciliario"],
    name: "Editar Usuario",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/domiciliario",
    visible: true,
  },
];
export default routesDomiciliario;

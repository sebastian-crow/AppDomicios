import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";

// Users
import ListClientes from "../components/addresses/listUsers/ListClientes";

// Products
import CreateProduct from "../components/addresses/products/CreateProduct";
import ListProducts from "../components/addresses/products/ListProducts";

// Orders
import TakeOrder from "../components/addresses/orders/TakeOrder";
import OrderList from "../components/addresses/orders/OrderList";

// Maps
import { ClientMap } from "../components/addresses/maps/mapbox/ClientMap";

var routesAdmin = [
  // Default routes
  {
    path: "/dashboard",
    rol: ["domiciliario", "cliente", "admin", "user"],
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
    component: UserPage,
    layout: "/admin",
    visible: true,
  },
  // Auth routes
  {
    path: "/listclientes",
    name: "Listar usuarios",
    rol: ["admin"],
    icon: "nc-icon nc-single-02",
    component: ListClientes,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/takeorder",
    name: "Hacer un pedido",
    icon: "nc-icon nc-cart-simple",
    rol: ["admin"],
    component: TakeOrder,
    layout: "/cliente",
    visible: true,
  },
  {
    path: "/orderslist",
    name: "Listar ordenes",
    icon: "nc-icon nc-spaceship",
    rol: ["domiciliario", "cliente", "admin"],
    component: OrderList,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/createproduct",
    name: "Crear producto",
    icon: "nc-icon nc-bank",
    rol: ["domiciliario", "cliente", "admin"],
    component: CreateProduct,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/listproducts",
    name: "Todos los productos",
    icon: "nc-icon nc-bank",
    rol: ["domiciliario", "cliente", "admin"],
    component: ListProducts,
    layout: "/admin",
    visible: true,
  },
  // Maps
  {
    path: "/clientmap/:id",
    name: "Client Map",
    rol: ["domiciliario", "cliente", "admin"],
    component: ClientMap,
    layout: "/admin",
    visible: false,
  },
];
export default routesAdmin;

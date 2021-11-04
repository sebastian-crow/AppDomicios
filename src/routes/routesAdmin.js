import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

import Inicio from "../components/addresses/vistas/Inicio";
import UserMap from "../components/addresses/vistas/UserMap";

//Servicios de authenticacion

import EditarUsuario from "../components/addresses/auth/EditarUsuario";

// Users
import ListClientes from "../components/addresses/listUsers/ListClientes";
import ListDomiciliarios from "../components/addresses/listUsers/ListDomiciliarios";
import UserProductList from "../components/addresses/products/UserProductList";

// Products
import Product from "../components/addresses/products/Product";
import CreateProduct from "../components/addresses/products/CreateProduct";
import EditProduct from "../components/addresses/products/EditProduct";
import ListProducts from "../components/addresses/products/ListProducts";

// Orders
import Orders from "../components/addresses/orders/Orders";
import TakeOrder from "../components/addresses/orders/TakeOrder";
import CreateOrder from "../components/addresses/orders/CreateOrder";
import EditOrder from "../components/addresses/orders/EditOrder";
import OrderList from "../components/addresses/orders/OrderList";
import UserOrderList from "../components/addresses/orders/UserOrderList";

// Maps
import { ClientMap } from '../components/addresses/maps/mapbox/ClientMap'
import { DealerMap } from '../components/addresses/maps/mapbox/DealerMap'



// Aqui añades las rutas y pones para que roles estan permitidas automaticamente se listan en el layout
var routesAdmin = [

  // Default routes
  {
    path: "/dashboard",
    rol: ['domiciliario', 'cliente', 'admin', 'user'],
    name: "Dashboard",
    icon: "nc-icon nc-diamond",
    component: Dashboard,
    layout: '/admin', visible: true
  },
  {
    path: "/icons",
    rol: ["admin", "cliente"],
    name: "Icons",
    icon: "nc-icon nc-pin-3",
    component: Icons,
    layout: '/admin', visible: false
  },
  {
    path: "/maps",
    rol: ["admin"],
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: '/admin', visible: true
  },
  {
    path: "/notifications",
    rol: ["admin"],
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: '/admin', visible: true
  },
  {
    path: "/user-page",
    rol: ["admin"],
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: '/admin', visible: true
  },
  {
    path: "/tables",
    rol: ["admin"],
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: '/admin',
    visible: true
  },
  {
    path: "/typography",
    rol: ["admin"],
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: '/admin', visible: true
  },
  {
    pro: true,
    path: "/upgrade",
    rol: ["admin"],
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: '/admin', visible: true
  },
  // Auth routes
  {
    path: "/listclientes",
    name: "User List",
    rol: ['admin'],
    icon: "nc-single-02",
    component: ListClientes,
    layout: '/admin',
    visible: true,
  },
  {
    path: "/takeorder",
    name: "Take order",
    icon: "nc-icon nc-bank",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: TakeOrder,
    //layout: `/${userRole()}`,
    layout: '/admin',
  },
  {
    path: "/orderslist",
    name: "Order List",
    icon: "nc-tablet-2",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: OrderList,
    layout: '/admin', visible: true
  },
  {
    path: "/createproduct",
    name: "Crear producto",
    icon: "nc-icon nc-bank",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: CreateProduct,
    layout: '/admin', visible: true
  },
  {
    path: "/userproductlist",
    name: "Listar mis productos",
    icon: "nc-icon nc-bank",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: UserProductList,
    layout: '/admin', visible: true
  },
  {
    path: "/listproducts",
    name: "Listar todos los productos",
    icon: "nc-icon nc-bank",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: ListProducts,
    layout: '/admin', visible: true
  },

  // Maps
  {
    path: '/clientmap/:id',
    name: "Client Map",
    rol: ['domiciliario', 'cliente', 'admin'],
    component: ClientMap,
    layout: '/admin',
    visible: false,
  },

  {
    path: "/dealermap/:id",
    rol: ["admin", "cliente"],
    name: "Dealer map",
    icon: "nc-icon nc-pin-3",
    component: DealerMap,
    layout: '/admin',
    visible: false,
  },
];
export default routesAdmin;

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
var routesCliente = [

  // Default routes
  {
    path: "/dashboard",
    rol: ['cliente'],
    name: "Dashboard",
    icon: "nc-icon nc-diamond",
    component: Dashboard,
    layout: '/cliente', 
    visible: false
  },
  {
    path: "/icons",
    rol: ['cliente'],
    name: "Icons",
    icon: "nc-icon nc-pin-3",
    component: Icons,
    layout: '/cliente', 
     visible: false
  },
  {
    path: "/maps",
    rol: ['cliente'],
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: '/cliente', 
    visible: false
  },
  {
    path: "/notifications",
    rol: ['cliente'],
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: '/cliente', 
    visible: false
  },
  {
    path: "/user-page",
    rol: ['cliente'],
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: '/cliente', 
    visible: true
  },
  {
    path: "/tables",
    rol: ['cliente'],
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: '/cliente', 
    visible: false
  },
  {
    path: "/typography",
    rol: ['cliente'],
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: '/cliente', 
    visible: false
  },
  {
    pro: true,
    path: "/upgrade",
    rol: ['cliente'],
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: '/cliente', 
    visible: false
  },

  // Auth routes
  {
    path: "/orderslist",
    name: "Order List",
    icon: "nc-tablet-2",
    rol: ['cliente'],
    component: UserOrderList,
    layout: '/cliente',
     visible: true
  },
  {
    path: "/takeorder",
    name: "Take order",
    icon: "nc-icon nc-bank",
    rol: ['cliente'],
    component: TakeOrder,
    layout: '/cliente', 
    visible: true
  },
  {
    path: "/createproduct",
    name: "Crear producto",
    icon: "nc-icon nc-bank",
    rol: ['cliente'],
    component: CreateProduct,
    layout: '/cliente', visible: true
  },
  {
    path: "/userproductlist",
    name: "Listar mis productos",
    icon: "nc-icon nc-bank",
    rol: ['cliente'],
    component: UserProductList,
    layout: '/cliente', visible: true
  },
  {
    path: "/listproducts",
    name: "Listar todos los productos",
    icon: "nc-icon nc-bank",
    rol: ['cliente'],
    component: ListProducts,
    layout: '/cliente',
     visible: true
  },

  // Orders
  {
    path: '/editorder/:id',
    name: 'Edit Order',
    icon: 'nc-icon nc-bank',
    rol: ['cliente'],
    component: EditOrder,
    layout: '/cliente',
    visible: false
  },



  // Maps
  {
    path: '/clientmap/:id',
    name: 'Client Map',
    rol: ['cliente'],
    component: ClientMap,
    layout: '/cliente', 
    visible: false,
  },

  {
    path: "/dealermap/:id",
    rol: ["admin", "cliente"],
    name: "Dealer map",
    icon: "nc-icon nc-pin-3",
    component: DealerMap,
    layout: '/cliente', 
    visible: false,
  },
];
export default routesCliente;



/*

*/
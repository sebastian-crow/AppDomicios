import EditUser from '../components/addresses/auth/EditUser';

// Product Orders
import UserProductOrderList from '../components/addresses/orders/productOrders/OrderProductListUser';
import OrderList from '../components/addresses/orders/ListOrdersClient';

// OrderProductEdit
import { EditOrderProduct } from '../components/addresses/orders/productOrders/OrderProductEdit';

// Delivery Orders
import TakeOrder from '../components/addresses/orders/TakeOrder';
import EditOrder from '../components/addresses/orders/EditOrder';

// MapOrderDealer
import { MapOrderDealer } from '../components/addresses/maps/MapBox/MapOrderDealer';

// Google Sheets Connection
import { GoogleSheetsConnect } from '../components/addresses/excel/googleSheetsConnect';

var routesCompany = [
  // OrdersProduct
  {
    path: '/orderProducts',
    rol: ['company'],
    name: 'Listar pedidos',
    icon: 'nc-icon nc-cart-simple',
    component: UserProductOrderList,
    layout: '/company',
    visible: true,
  },
  {
    path: '/editOrderProduct/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    rol: ['company'],
    name: 'Edit Order Product',
    icon: 'nc-icon nc-cart-simple',
    component: EditOrderProduct,
    layout: '/company',
    visible: false,
  },
  {
    path: '/orderslist',
    name: 'Listar ordenes',
    icon: 'nc-icon nc-spaceship',
    rol: ['company'],
    component: OrderList,
    layout: '/company',
    visible: true,
  },
  {
    path: '/takeorder/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    name: 'Cordinar entrega',
    icon: 'nc-icon nc-cart-simple',
    rol: ['company'],
    component: TakeOrder,
    layout: '/company',
    visible: false,
  },
  {
    path: '/editorder/:id',
    name: 'Editar orden',
    icon: 'nc-icon nc-bank',
    rol: ['company'],
    component: EditOrder,
    layout: '/company',
    visible: false,
  },
  // Maps
  {
    path: '/map/:id',
    name: 'Mapa del cliente',
    rol: ['company'],
    component: MapOrderDealer,
    layout: '/company',
    visible: false,
  },
  // User's Pages
  {
    path: '/editUser',
    rol: ['company'],
    name: 'Editar usuario',
    icon: 'nc-icon nc-single-02',
    component: EditUser,
    layout: '/company',
    visible: true,
  },
  {
    path: '/googlesheetsconnection',
    rol: ['company'],
    name: 'Google Sheets',
    icon: 'nc-icon nc-single-02',
    component: GoogleSheetsConnect,
    layout: '/company',
    visible: true,
  },
];
export default routesCompany;

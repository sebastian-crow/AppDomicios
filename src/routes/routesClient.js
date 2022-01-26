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

var routesClient = [
  // OrdersProduct
  {
    path: '/orderProducts',
    rol: ['client'],
    name: 'Listar pedidos',
    icon: 'nc-icon nc-cart-simple',
    component: UserProductOrderList,
    layout: '/client',
    visible: true,
  },
  {
    path: '/editOrderProduct/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    rol: ['client'],
    name: 'Edit Order Product',
    icon: 'nc-icon nc-cart-simple',
    component: EditOrderProduct,
    layout: '/client',
    visible: false,
  },
  {
    path: '/orderslist',
    name: 'Listar ordenes',
    icon: 'nc-icon nc-spaceship',
    rol: ['client'],
    component: OrderList,
    layout: '/client',
    visible: true,
  },
  {
    path: '/takeorder/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    name: 'Cordinar entrega',
    icon: 'nc-icon nc-cart-simple',
    rol: ['client'],
    component: TakeOrder,
    layout: '/client',
    visible: false,
  },
  {
    path: '/editorder/:id',
    name: 'Editar orden',
    icon: 'nc-icon nc-bank',
    rol: ['client'],
    component: EditOrder,
    layout: '/client',
    visible: false,
  },
  // Maps
  {
    path: '/map/:id',
    name: 'Mapa del cliente',
    rol: ['client'],
    component: MapOrderDealer,
    layout: '/client',
    visible: false,
  },
  // User's Pages
  {
    path: '/editUser',
    rol: ['client'],
    name: 'Editar usuario',
    icon: 'nc-icon nc-single-02',
    component: EditUser,
    layout: '/client',
    visible: true,
  },
  {
    path: '/googlesheetsconnection',
    rol: ['client'],
    name: 'Google Sheets',
    icon: 'nc-icon nc-single-02',
    component: GoogleSheetsConnect,
    layout: '/client',
    visible: true,
  },
];
export default routesClient;

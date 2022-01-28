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
    rol: ['client'],
    name: 'Listar pedidos',
    icon: 'nc-icon nc-cart-simple',
    component: UserProductOrderList,
    layout: '/clientCompany',
    visible: true,
  },
  {
    path: '/editOrderProduct/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    rol: ['client'],
    name: 'Edit Order Product',
    icon: 'nc-icon nc-cart-simple',
    component: EditOrderProduct,
    layout: '/clientCompany',
    visible: false,
  },
  {
    path: '/orderslist',
    name: 'Listar ordenes',
    icon: 'nc-icon nc-spaceship',
    rol: ['client'],
    component: OrderList,
    layout: '/clientCompany',
    visible: true,
  },
  {
    path: '/takeorder/:idClientEmpresa/:orderNumberSheets/:nameYApellidoClient',
    name: 'Cordinar entrega',
    icon: 'nc-icon nc-cart-simple',
    rol: ['client'],
    component: TakeOrder,
    layout: '/clientCompany',
    visible: false,
  },
  {
    path: '/editorder/:id',
    name: 'Editar orden',
    icon: 'nc-icon nc-bank',
    rol: ['client'],
    component: EditOrder,
    layout: '/clientCompany',
    visible: false,
  },
  // Maps
  {
    path: '/map/:id',
    name: 'Mapa del cliente',
    rol: ['client'],
    component: MapOrderDealer,
    layout: '/clientCompany',
    visible: false,
  },
  // User's Pages
  {
    path: '/editUser',
    rol: ['client'],
    name: 'Editar usuario',
    icon: 'nc-icon nc-single-02',
    component: EditUser,
    layout: '/clientCompany',
    visible: true,
  },
  {
    path: '/googlesheetsconnection',
    rol: ['client'],
    name: 'Google Sheets',
    icon: 'nc-icon nc-single-02',
    component: GoogleSheetsConnect,
    layout: '/clientCompany',
    visible: true,
  },
];
export default routesCompany;

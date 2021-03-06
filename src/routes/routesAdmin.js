// Users
import ListClientss from '../components/addresses/listUsers/ListClients';
import EditUser from '../components/addresses/auth/EditUser';

// Orders
import OrderList from '../components/addresses/orders/ListOrdersAdmin';

// Orders Product
import AdminProductOrderList from '../components/addresses/orders/productOrders/OrderProductListAdmin';
import { OrderProductEdit } from '../components/addresses/orders/productOrders/OrderProductEdit';

// Map
import { Map } from '../components/addresses/maps/MapBox/MapOrderDealer';

var routesAdmin = [
  {
    path: '/editUser',
    rol: ['admin'],
    name: 'Editar usuario',
    icon: 'nc-icon nc-single-02',
    component: EditUser,
    layout: '/admin',
    visible: true,
  },
  // Auth routes
  {
    path: '/listclients',
    name: 'Listar usuarios',
    rol: ['admin'],
    icon: 'nc-icon nc-single-02',
    component: ListClientss,
    layout: '/admin',
    visible: true,
  },
  {
    path: '/orderslist',
    name: 'Listar ordenes',
    icon: 'nc-icon nc-spaceship',
    rol: ['admin'],
    component: OrderList,
    layout: '/admin',
    visible: true,
  },
  {
    path: '/ordersproductlist',
    name: 'Listar Pedidos',
    icon: 'nc-icon nc-spaceship',
    rol: ['admin'],
    component: AdminProductOrderList,
    layout: '/admin',
    visible: true,
  },
  {
    path: '/editOrderProduct/:orderProductNumber',
    rol: ['admin'],
    name: 'Edit Order Product',
    icon: 'nc-icon nc-cart-simple',
    component: OrderProductEdit,
    layout: '/admin',
    visible: false,
  },
  // Maps
  {
    path: '/map/:id',
    name: 'Client Map',
    rol: ['admin'],
    component: Map,
    layout: '/admin',
    visible: false,
  },
];
export default routesAdmin;

// Orders
import DomiciliaryOrderList from '../components/addresses/orders/ListOrdersDomiciliary';
import EditUser from '../components/addresses/auth/EditUser';

// Maps
import { MapOrderDealer } from '../components/addresses/maps/MapBox/MapOrderDealer';

var routesDomiciliary = [
  {
    path: '/orderslist',
    name: 'Listar ordenes',
    icon: 'nc-icon nc-spaceship',
    rol: ['domiciliary'],
    component: DomiciliaryOrderList,
    layout: '/domiciliary',
    visible: true,
  },
  // Maps
  {
    path: '/dealermap/:id',
    rol: ['domiciliary'],
    name: 'Dealer map',
    icon: 'nc-icon nc-pin-3',
    component: MapOrderDealer,
    layout: '/domiciliary',
    visible: false,
  },
  {
    path: '/editUser',
    rol: ['domiciliary'],
    name: 'Editar user',
    icon: 'nc-icon nc-single-02',
    component: EditUser,
    layout: '/domiciliary',
    visible: true,
  },
];
export default routesDomiciliary;

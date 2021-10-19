import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { restoreSessionStateAction } from "./store/storeAddresses/store/reducer";

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
//import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// Utils
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";


// Addresses Components

//Vistas
import Inicio from "./ui-component/addresses/vistas/Inicio";
import UserMap from "./ui-component/addresses/vistas/UserMap";

//Servicios de authenticacion
//import Register from "./ui-component/addresses/auth/Register";
import Register from './views/pages/authentication/authentication3/Register3'

import EditarUsuario from "./ui-component/addresses/auth/EditarUsuario";
import Login from './views/pages/authentication/authentication3/Login3'

// Users
import ListClientes from "./ui-component/addresses/listUsers/ListClientes";
import ListDomiciliarios from "./ui-component/addresses/listUsers/ListDomiciliarios"
import UserProductList from "./ui-component/addresses/products/UserProductList"

// Products
import Product from "./ui-component/addresses/products/Product"
import CreateProduct from "./ui-component/addresses/products/CreateProduct"
import EditProduct from "./ui-component/addresses/products/EditProduct"
import ListProducts from "./ui-component/addresses/products/ListProducts"

// Orders
import Orders from './ui-component/addresses/orders/Orders'
import TakeOrder from './ui-component/addresses/orders/TakeOrder'
import CreateOrder from './ui-component/addresses/orders/CreateOrder'
import EditOrder from './ui-component/addresses/orders/EditOrder'
import OrderList from './ui-component/addresses/orders/OrderList'
import UserOrderList from "./ui-component/addresses/orders/UserOrderList";


// Proof
import DealerMap from './ui-component/addresses/vistas/DealerMap'
import Dashboard from './views/dashboard/Default'
import SamplePage from './views/sample-page'

// Main Layout
import MainLayout from './layout/MainLayout'

// Maps
import { MapBox } from './ui-component/addresses/maps/mapbox/'
import { ClientMap } from './ui-component/addresses/maps/mapbox/ClientMap'


// ===========================|| APP ||=========================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    const user = useSelector((state) => state.login.usuario.user)

    const dispatch = useDispatch();
    React.useEffect(() => {
        // on app start, restore state stored from local/session storage
        dispatch(restoreSessionStateAction());
    }, [dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                {user && (
                    <MainLayout />
                )}
                <CssBaseline />
                <NavigationScroll>
                    <Switch>
                        <PrivateRoute exact path="/" component={SamplePage} />
                        <PrivateRoute path="/listclientes" component={ListClientes} />
                        <PrivateRoute path="/listdomiciliarios" component={ListDomiciliarios} />
                        <PrivateRoute path="/listproducts" component={ListProducts} />
                        <PrivateRoute path="/userproductlist" component={UserProductList} />
                        <PrivateRoute path="/userorderlist" component={UserOrderList} />
                        <PrivateRoute path="/createproduct" component={CreateProduct} />
                        <PrivateRoute path="/dealermap" component={DealerMap} />

                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/orders" component={Orders} />
                        <PrivateRoute path="/takeorder" component={TakeOrder} />
                        <PrivateRoute path="/orders" component={Orders} />
                        <PrivateRoute path="/orderlist" component={OrderList} />

                        <PrivateRoute path="/clientmap/:id" component={ClientMap} />


                        <PrivateRoute path="/mapbox" component={MapBox} />

                        <PrivateRoute path="/createOrder" component={CreateOrder} />
                        <PrivateRoute path="/editOrder/:id" component={EditOrder} />

                        <PrivateRoute path="/mapuser/:id" component={UserMap} />
                        <PublicRoute restricted={true} path="/login" component={Login} />
                        <PublicRoute
                            restricted={true}
                            path="/register"
                            component={Register}
                        />
                        <PrivateRoute path="/editarusuario" component={EditarUsuario} />
                        <PrivateRoute path="/editarproducto/:id" component={EditProduct} />
                    </Switch>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;







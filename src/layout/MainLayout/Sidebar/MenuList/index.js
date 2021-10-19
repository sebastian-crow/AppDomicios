import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
//import menuItem from 'menu-items';

// Store
import { store } from '../../../../store/storeAddresses/store/configureStore'


// Items
//import dashboard from '../dashboard';
import dashboard from '../../../../menu-items/dashboard'
import pages from '../../../../menu-items/pages'
import other from '../../../../menu-items/other'



// ===========================|| MENUITEMS   ||=========================== //

//  Menu items on based in user role
const menuItem = () => {

    // Import store
    const state = store.getState()

    // Get User by store
    const rol = state.login.usuario.user.rol
    
    // Define MenuIItems
    let menuItem

    switch (rol) {
        case 'admin':
            menuItem = {
                items: [dashboard, pages]
            }
            break;
        case 'cliente':
            menuItem = {
                items: [dashboard, pages]
            }
            break;
        case 'domiciliario':
            menuItem = {
                items: [other]
            }
            break;
        default:
            break;
    }

    // Returns menuItem Object
    return menuItem
}



// ===========================|| SIDEBAR MENU LIST ||=========================== //

const MenuList = () => {
    const navItems = menuItem().items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;

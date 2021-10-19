//Items
import dashboard from './dashboard';
import pages from './pages';
import other from './other';


//import utilities from './utilities';

// ===========================|| MENU ITEMS ||=========================== //


const menuItem =  {
    items:[dashboard, pages]
}


export default menuItem;




/* 
switch (user.rol) {
        case 'cliente':
            menuItems  = {
                items:[dashboard, pages]
            }
            console.log('USER ROL IS  CLIENT OR ADMIN AND THESE ARE THEIR ITEMS', menuItems)    
            break;
        case 'domiciliario':
            menuItems = {
                items:[other]
            }
            console.log('USER ROL IS DOMICILIARIO AND THESE ARE THEIR ITEMS', menuItems)
        default:
            break;
    }
*/
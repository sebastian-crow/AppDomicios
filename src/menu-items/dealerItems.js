// assets
import KitchenIcon from '@mui/icons-material/Kitchen';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Import store
import { store } from '../store/storeAddresses/store/configureStore'


// Redux
import { useDispatch, useSelector } from "react-redux";

// Constant
const icons = {
    KitchenIcon,
    ReceiptIcon
};

// Define state
const state = store.getState()

// Get user from state




// ===========================|| DEALER MENU ITEMS ||=========================== //



export const DealerItems = () => {
    const user = useSelector((state) => state.login.usuario.user)
    console.log('DOMICILIARIO USER', user)

    if (user) {
        return {
            id: 'pages',
            title: 'Orders',
            type: 'group',
            children: [
                {
                    id: 'default',
                    title: 'Orders',
                    type: 'item',
                    url: `/dealermap/${user._id}`,
                    icon: icons.ReceiptIcon,
                    breadcrumbs: false
                }
            ],
        };
    } else {
        return {
            id: 'pages',
            title: 'Orders',
            type: 'group',
            children: [
                {
                    id: 'default',
                    title: 'Orders',
                    type: 'item',
                    url: `/dealermap/`,
                    icon: icons.ReceiptIcon,
                    breadcrumbs: false
                }
            ],
        };
    }
}


export const dealerItems_two = {
    id: 'pages',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Products',
            type: 'item',
            url: '/listproducts',
            icon: icons.KitchenIcon,
            breadcrumbs: false
        }
    ],
};



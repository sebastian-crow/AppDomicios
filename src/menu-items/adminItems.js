// assets
import KitchenIcon from '@mui/icons-material/Kitchen';

// constant
const icons = {
    KitchenIcon
};

// ===========================|| ADMIN MENU ITEMS ||=========================== //

const adminItems = {
    id: 'pages',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Products Available',
            type: 'item',
            url: '/listproducts',
            icon: icons.KitchenIcon,
            breadcrumbs: false
        },
    ]
};

export default adminItems;

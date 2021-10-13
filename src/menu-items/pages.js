// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AllInboxIcon from '@mui/icons-material/AllInbox';
// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    InventoryIcon,
    AddBoxIcon,
    LunchDiningIcon,
    KitchenIcon,
    AllInboxIcon
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const pages = {
    id: 'pages',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'My Products',
            type: 'collapse',
            icon: icons.LunchDiningIcon,
            children: [
                {
                    id: 'default',
                    title: 'Create',
                    type: 'item',
                    icon: icons.AddBoxIcon,
                    url: '/createproduct', // Change this route
                    //target: true
                    breadcrumbs: false
                },
                {
                    id: 'register3',
                    title: 'Products',
                    type: 'item',
                    icon: icons.LunchDiningIcon,
                    url: '/userproductlist', // And change this route too
                    //target: true
                    breadcrumbs: false
                }
            ],
        },
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

export default pages;

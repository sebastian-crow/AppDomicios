// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall
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
            icon: icons.IconKey,
            children: [
                {
                    id: 'default',
                    title: 'Create',
                    type: 'item',
                    icon: icons.IconKey,
                    url: '/createproduct', // Change this route
                    //target: true
                    breadcrumbs: false
                },
                {
                    id: 'register3',
                    title: 'Products',
                    type: 'item',
                    icon: icons.IconKey,
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
            icon: icons.IconKey,
            breadcrumbs: false
        },
    ]
};

export default pages;

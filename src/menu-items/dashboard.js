// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Orders',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Orders',
            type: 'item',
            url: '/orderlist',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'default',
            title: 'Take Order',
            type: 'item',
            url: '/takeorder',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ],
    
};

export default dashboard;

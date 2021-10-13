// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddBoxIcon from '@mui/icons-material/AddBox';
// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    ReceiptIcon,
    AddBoxIcon
    
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
            icon: icons.ReceiptIcon,
            breadcrumbs: false
        },
        {
            id: 'default',
            title: 'Take Order',
            type: 'item',
            url: '/takeorder',
            icon: icons.AddBoxIcon,
            breadcrumbs: false
        }
    ],
    
};

export default dashboard;

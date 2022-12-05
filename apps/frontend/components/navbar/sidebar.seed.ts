import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';

interface SidebarLink {
    name: string;
    icon?: any;
    path: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
        name: 'Products',
        icon: InventoryIcon,
        path: '/products',
    },
    {
        name: 'Orders',
        icon: ListAltIcon,
        path: '/orders',
    },
]
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCart } from 'react-use-cart';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

export default function Cart() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isEmpty) return null;

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
            >
                <ShoppingCartIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item) => (
                    <MenuItem key={item._id}>
                        <Typography variant='h6'>
                            {item.name}
                        </Typography>
                        <IconButton size='small' onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant='h6'>
                            {item.quantity}
                        </Typography>
                        <IconButton size='small' onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                            <AddIcon />
                        </IconButton>
                        <Typography variant='h6'>
                            {item.price * item.quantity}
                        </Typography>
                        <IconButton size='small' onClick={() => removeItem(item.id)}>
                            <CloseIcon />
                        </IconButton>
                    </MenuItem>
                ))}
                <MenuItem>
                    <Typography variant='h6'>
                        Total: {cartTotal}
                    </Typography>
                </MenuItem>
                <MenuItem sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button>
                        Checkout
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
}

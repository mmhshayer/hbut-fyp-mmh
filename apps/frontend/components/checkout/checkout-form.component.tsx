import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import React from 'react'
import { useCart } from 'react-use-cart';
import { PageProps } from '../../shared/page.interface';

export default function CheckoutForm({ sx }: PageProps) {
    const { items } = useCart();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ...sx,
        }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Checkout
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px',
            }}>
                <Typography variant='h6'>
                    Name
                </Typography>
                <Typography variant='h6'>
                    Quantity
                </Typography>
                <Typography variant='h6'>
                    Price
                </Typography>
            </Box>
            {items.map((item) => (
                <Box key={item._id} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '10px',
                }}>
                    <Typography variant='h6'>
                        {item.name}
                    </Typography>
                    <Typography variant='h6'>
                        {item.quantity}
                    </Typography>
                    <Typography variant='h6'>
                        {item.price * item.quantity}
                    </Typography>
                </Box>
            ))}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px',
            }}>
                <Button variant='contained' color='primary'>
                    Confirm Checkout
                </Button>
                <Typography variant='h4'>
                    Total: {items.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                </Typography>
            </Box>
        </Box>
    )
}

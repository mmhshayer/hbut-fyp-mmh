import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useApi } from '../../features/api';
import React from 'react'
import { useCart } from 'react-use-cart';
import { PageProps } from '../../shared/page.interface';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function CheckoutForm({ sx }: PageProps) {
    const router = useRouter();
    const { items, emptyCart } = useCart();

    const { data, loading, callApi } = useApi({
        url: '/orders',
        method: 'POST',
        lazy: true,
    });

    const handleCheckout = () => {
        const checkout = {
            products: items.map((item) => ({
                product: item._id,
                quantity: item.quantity
            })),
            total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        }
        callApi(checkout)
    }

    useEffect(() => {
        if (!loading && data) {
            emptyCart();
            toast.success('Checkout successful')
            router.push('/')
        }
    }, [data])

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
                <Button variant='contained' color='primary' onClick={handleCheckout}>
                    Confirm Checkout
                </Button>
                <Typography variant='h4'>
                    Total: {items.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                </Typography>
            </Box>
        </Box>
    )
}

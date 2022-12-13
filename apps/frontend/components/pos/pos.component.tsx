import Box from "@mui/material/Box";
import useApi from '../../features/api/use-api.hook';
import { Product } from "../products/product.interface";
import { useEffect } from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import PageLoader from '../common/page-loader.component';
import Typography from '@mui/material/Typography';
import { useCart } from 'react-use-cart';
import { useRouter } from "next/router";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function Pos() {
    const router = useRouter();
    const { emptyCart, addItem, removeItem, items, cartTotal
    } = useCart()

    const { data: products, loading: productsLoading } = useApi<Product[]>({
        url: '/products',
    });

    const { data, loading, callApi } = useApi({
        url: '/orders',
        method: 'POST',
        lazy: true,
    });

    useEffect(() => {
        if (router.isReady) {
            emptyCart();
        }
    }, [router])

    const handleCheckout = () => {
        const checkout = {
            products: items.map((item) => ({
                product: item._id,
                quantity: item.quantity
            })),
            total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        }
        // callApi(checkout)
        console.log(checkout)
    }

    if (!products) return null;

    return (
        <PageLoader loading={productsLoading}>
            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                justifyContent: {
                    xs: 'center',
                    md: 'space-between',
                },
                border: '1px solid black',
                padding: '10px',
                borderRadius: '5px',
                gap: '10px',
            }}>
                {products.length > 0 && (

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => addItem({
                                                id: product._id,
                                                ...product
                                            })}>
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
                {items.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => removeItem(item.id)}>
                                                <RemoveShoppingCartIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell>{cartTotal}</TableCell>
                                    <TableCell>
                                        <Button onClick={handleCheckout} variant='contained'>Checkout</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </PageLoader>
    )
}

import { Button, Card, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { PageProps } from '../../shared/page.interface';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from 'react-use-cart';

interface ProductCardProps extends PageProps {
    product: any;
}

export default function ProductCard({ sx, product }: ProductCardProps) {
    const { addItem } = useCart();
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={<Link href={`${product.company.permalink}/${product.permalink}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    {product.name}
                </Link>}
                subheader={<Link href={`${product.company.permalink}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    By {product.company.name}
                </Link>}
                action={
                    <IconButton aria-label="add to cart" onClick={() => addItem({
                        id: product._id,
                        ...product
                    })}
                        sx={{ border: '1px solid #ccc', borderRadius: '50%' }}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image="/placeholder-400x400.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Price: {product.price} BDT
                </Typography>
                <Typography variant="h6" noWrap>{product.description}</Typography>
            </CardContent>
        </Card>
    )
};
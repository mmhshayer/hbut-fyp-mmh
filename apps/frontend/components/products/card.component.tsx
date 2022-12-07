import { Card, CardContent, CardHeader, CardMedia, Collapse, Typography } from '@mui/material';
import Link from 'next/link';
import { PageProps } from '../../shared/page.interface';

interface ProductCardProps extends PageProps {
    product: any;
}

export default function ProductCard({ sx, product }: ProductCardProps) {
    console.log(product)
    return (
        <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                title={<Link href={`${product.company.name}/${product.name}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>{product.name}</Link>}
                subheader={<Link href={`${product.company.permalink}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>By {product.company.name}</Link>}
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
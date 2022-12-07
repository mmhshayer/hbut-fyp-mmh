import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Collapse, Typography } from '@mui/material';
import Link from 'next/link';
import { PageProps } from '../../shared/page.interface';

interface ProductCardProps extends PageProps {
    product: any;
}

export default function ProductCard({ sx, product }: ProductCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={`${product.company.name}/${product.name}`}>
                <CardHeader
                    title={product.name}
                    subheader={product.price + ' BDT'}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="/placeholder-400x400.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        by {product.company.name}
                    </Typography>
                    <Typography variant="h6" noWrap>{product.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { PageProps } from '../../shared/page.interface';

interface ProductCardProps extends PageProps {
    product: any;
}

export default function ProductCard({ sx, product }: ProductCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={product.name}
                subheader={product.price}
            />
            <CardMedia
                component="img"
                height="194"
                image="/placeholder-400x400.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6">{product.description}</Typography>
            </CardContent>
        </Card>
    )
};
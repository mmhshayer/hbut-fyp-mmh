
import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { ProductAdd, ProductCard } from '../../../components/products';


const Products: NextPage = () => {
    return (
        <Container>
            <ProductAdd sx={{ p: 8 }} />
            <ProductCard sx={{ p: 8 }} />
        </Container>
    );
};

export default Products;
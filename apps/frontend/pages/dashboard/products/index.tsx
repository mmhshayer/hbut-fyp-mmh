
import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { ProductList } from '../../../components/products';


const Products: NextPage = () => {
    return (
        <Container>
            <ProductList />
        </Container>
    );
};

export default Products;
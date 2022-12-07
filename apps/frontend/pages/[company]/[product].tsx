import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import ProductDetail from '../../components/products/detail.component';


const Product: NextPage = () => {
    return (
        <Container>
            <ProductDetail sx={{ mt: 2 }} />
        </Container >
    );
};

export default Product;

import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { ProductEdit } from '../../../../components/products';


const ProductsEdit: NextPage = () => {
    return (
        <Container>
            <ProductEdit sx={{ p: 8 }} />
        </Container>
    );
};

export default ProductsEdit;

import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import OrderList from '../../../components/orders/list.component';


const Products: NextPage = () => {
    return (
        <Container>
            <OrderList />
        </Container>
    );
};

export default Products;
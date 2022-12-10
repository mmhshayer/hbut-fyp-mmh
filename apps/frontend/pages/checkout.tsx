import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { CheckoutForm } from '../components/checkout';

const Checkout: NextPage = () => {
    return (
        <Container>
            <CheckoutForm sx={{ mt: 2 }} />
        </Container>
    );
};

export default Checkout;
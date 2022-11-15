import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { RegisterForm } from '../components/auth';

const Register: NextPage = () => {
  return (
    <Container>
      <RegisterForm sx={{ mt: 2 }} />
    </Container>
  );
};

export default Register;

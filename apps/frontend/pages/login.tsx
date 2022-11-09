import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { LoginForm } from '../components/login';

const Login: NextPage = () => {
  return (
    <Container>
      <LoginForm sx={{ mt: 2 }} />
    </Container>
  );
};

export default Login;

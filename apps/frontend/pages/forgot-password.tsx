import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { ForgotPasswordForm } from '../components/auth';

const ForgotPassword: NextPage = () => {
  return (
    <Container>
      <ForgotPasswordForm sx={{ mt: 2 }} />
    </Container>
  );
};

export default ForgotPassword;

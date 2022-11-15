import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import { RegisterCompanyForm } from '../components/auth';

const RegisterCompany: NextPage = () => {
  return (
    <Container>
      <RegisterCompanyForm sx={{ mt: 2 }} />
    </Container>
  );
};

export default RegisterCompany;

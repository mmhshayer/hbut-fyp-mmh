import { Container } from '@mui/system';
import { NextPage } from 'next';
import CompanyCards from '../components/company-selection/company-cards.component';

const SelectCompany: NextPage = () => {
  return (
    <Container>
      <CompanyCards sx={{ mt: 2 }} />
    </Container>
  );
};

export default SelectCompany;

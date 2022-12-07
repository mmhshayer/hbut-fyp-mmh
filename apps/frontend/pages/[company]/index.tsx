import Container from '@mui/system/Container/Container';
import { NextPage } from 'next/types';
import CompanyDetail from '../../components/company/detail.component';


const Company: NextPage = () => {
    return (
        <Container>
            <CompanyDetail sx={{
                mt: 2
            }} />
        </Container>
    );
};

export default Company;
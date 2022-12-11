import Container from '@mui/system/Container';
import { useUser } from '../../features/user';
import { NextPage } from 'next';
import { Pos } from '../../components/pos';

const POS: NextPage = () => {
    const { user, currentCompany } = useUser()
    return (
        <Container>
            <div>
                <h1>Dashboard</h1>
                <p>user id: {user?._id}</p>
                <p>Current Company: {currentCompany?.name}</p>
            </div>
            <Pos />
        </Container>
    );
};

export default POS;

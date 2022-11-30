import Box from '@mui/system/Box';
import { useUser } from '../../features/user';
import { PageProps } from '../../shared';

export default function CompanyCards({ sx }: PageProps) {
  const { user, companies } = useUser();
  console.log(user);
  console.log(companies);
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <div>SelectCompany</div>
    </Box>
  );
}

import Box from '@mui/system/Box';
import { FC, PropsWithChildren } from 'react';

const PageBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageBody;

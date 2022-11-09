import { Box, CircularProgress } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface PageLoaderProps {
  fullHeight?: boolean;
  height?: number; // like 70 or 50 as in 70% or 50%
  loading?: boolean;
}

const PageLoader: FC<PropsWithChildren<PageLoaderProps>> = ({
  fullHeight,
  height,
  loading,
  children,
}) => {
  return (
    <>
      {!loading && children}
      {loading && (
        <Box
          sx={{
            width: 1,
            minHeight: fullHeight ? '100vh' : height ? `${height}vh` : '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </>
  );
};

export default PageLoader;

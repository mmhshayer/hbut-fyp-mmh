import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../hooks/auth';
import { ThemeProvider } from '../theme';

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default GlobalProviders;

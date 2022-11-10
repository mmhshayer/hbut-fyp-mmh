import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../hooks/auth';
import { RouteGuardProvider } from '../hooks/router';
import { ThemeProvider } from '../theme';

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <RouteGuardProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </RouteGuardProvider>
    </AuthProvider>
  );
};

export default GlobalProviders;

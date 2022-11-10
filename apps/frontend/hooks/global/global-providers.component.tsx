import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../auth';
import { RouteGuardProvider } from '../router';
import { ThemeProvider } from '../../theme';

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

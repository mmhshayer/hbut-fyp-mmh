import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../auth';
import { RouteGuard, RouteGuardProvider } from '../router';
import { ThemeProvider } from '../../theme';
import { UserProvider } from '../user';

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <RouteGuardProvider>
          <ThemeProvider>
            <RouteGuard>{children}</RouteGuard>
          </ThemeProvider>
        </RouteGuardProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default GlobalProviders;

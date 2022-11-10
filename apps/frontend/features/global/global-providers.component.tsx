import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../auth';
import { RouteGuardProvider } from '../router';
import { ThemeProvider } from '../../theme';
import { UserProvider } from '../user';

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <RouteGuardProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RouteGuardProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default GlobalProviders;

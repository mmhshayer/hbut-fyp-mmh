import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from '../auth';
import { RouteGuard, RouteGuardProvider } from '../router';
import { ThemeProvider } from '../../theme';
import { UserProvider } from '../user';
import { CartProvider } from "react-use-cart";

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CartProvider>
      <AuthProvider>
        <UserProvider>
          <RouteGuardProvider>
            <ThemeProvider>
              <RouteGuard>{children}</RouteGuard>
            </ThemeProvider>
          </RouteGuardProvider>
        </UserProvider>
      </AuthProvider>
    </CartProvider>
  );
};

export default GlobalProviders;

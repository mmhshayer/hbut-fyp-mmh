import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '../theme';

const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default GlobalProviders;

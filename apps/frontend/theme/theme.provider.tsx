import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import ThemeConfig, { EnableDarkMode } from './theme.config';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={ThemeConfig}>
      <CssBaseline enableColorScheme={EnableDarkMode} />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

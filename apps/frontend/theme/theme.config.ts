import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './common/palette';
import typography from './common/typography';

export const EnableDarkMode = false;

const ThemeConfig = responsiveFontSizes(
  createTheme({
    palette,
    components: {
      // ...components,
    },
    typography,
  })
);

export default ThemeConfig;

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './common/palette';
import typography from './common/typography';
import button from './overrides/button.override';

export const EnableDarkMode = false;

const ThemeConfig = responsiveFontSizes(
  createTheme({
    palette,
    components: {
      ...button,
    },
    typography,
  })
);

export default ThemeConfig;

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './common/palette';
import typography from './common/typography';
import { alert, button, inputLabel } from './overrides';

export const EnableDarkMode = false;

const ThemeConfig = responsiveFontSizes(
  createTheme({
    palette,
    components: {
      ...alert,
      ...button,
      ...inputLabel,
    },
    typography,
  })
);

export default ThemeConfig;

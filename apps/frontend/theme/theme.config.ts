import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './common/palette';
import typography from './common/typography';
import mixins from './mixins';
import { alert, button, inputLabel, paper } from './overrides';

export const EnableDarkMode = false;

const ThemeConfig = responsiveFontSizes(
  createTheme({
    palette,
    components: {
      ...alert,
      ...button,
      ...inputLabel,
      ...paper,
    },
    typography,
    mixins,
  })
);

export default ThemeConfig;

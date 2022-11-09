import '@mui/material/styles/createPalette';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary: SimplePaletteColorOptionsn;
    blueLight: SimplePaletteColorOptions;
    link: SimplePaletteColorOptions;
  }
  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions;
    blueLight?: SimplePaletteColorOptions;
    link?: SimplePaletteColorOptions;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
  }
}

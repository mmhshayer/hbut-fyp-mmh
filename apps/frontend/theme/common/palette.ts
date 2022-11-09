import { PaletteOptions } from '@mui/material/styles/createPalette';

const palette: PaletteOptions = {
  primary: {
    main: '#18396A',
    light: 'rgba(24, 57, 106, 0.1)',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF671B',
    light: 'rgba(255, 103, 27, 0.2)',
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#72CFEC',
    light: 'rgba(114, 207, 236, 0.1)',
    contrastText: '#000000',
  },
  blueLight: {
    main: '#144F96',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  error: {
    main: '#E12A26',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#007B00',
  },
  warning: {
    main: '#F7B118',
    contrastText: '#000000',
  },
  link: {
    main: '#0070EE',
    contrastText: '#FFFFFF',
  },
};

export default palette;

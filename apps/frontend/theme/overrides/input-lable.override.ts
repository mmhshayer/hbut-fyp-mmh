import { StyleOverrides } from '../types/override.type';

const inputLabel: StyleOverrides = {
  MuiInputLabel: {
    defaultProps: {
      sx: {
        color: 'common.black',
      },
    },
    styleOverrides: {
      root: {
        color: 'black',
      },
      asterisk: {
        color: '#FF671B',
      },
    },
  },
};

export default inputLabel;

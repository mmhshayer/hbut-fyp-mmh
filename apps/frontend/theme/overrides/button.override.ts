import { StyleOverrides } from '../types/override.type';

const button: StyleOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
      },
      sizeMedium: {
        minWidth: 150,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24,
        borderRadius: 4,
      },
      sizeSmall: {
        minWidth: 150,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 4,
      },
      outlined: {
        borderWidth: 2,
        ':hover': {
          borderWidth: 2,
        },
      },
    },
  },
};

export default button;

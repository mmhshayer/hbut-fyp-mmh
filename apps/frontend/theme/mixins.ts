import { MixinsOptions } from '@mui/material/styles/createMixins';

const mixins: MixinsOptions = {
  toolbar: {
    // breakpoint xs
    'minHeight': 72,
    // breakpoint md and up
    '@media (min-width:900px)': {
      minHeight: 56,
    },
  },
};

export default mixins;

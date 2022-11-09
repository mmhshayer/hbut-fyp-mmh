import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { StyleOverrides } from '../types/override.type';

const alert: StyleOverrides = {
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        success: <CheckCircleOutlineRoundedIcon sx={{ fontSize: 'inherit' }} />,
        warning: <WarningAmberRoundedIcon sx={{ fontSize: 'inherit' }} />,
        error: <ErrorOutlineRoundedIcon sx={{ fontSize: 'inherit' }} />,
      },
    },
    styleOverrides: {
      root: ({ ownerState: { severity } }) => ({
        color: '#000000',
        borderWidth: 2,
        borderStyle: 'solid',
        ...(severity === 'success' && { borderColor: '#007B00' }),
        ...(severity === 'error' && { borderColor: '#E12A26' }),
        ...(severity === 'warning' && { borderColor: '#F7B118' }),
        ...(severity === 'info' && { borderColor: '#0070EE' }),
        paddingTop: 16,
        paddingBottom: 16,
      }),
      icon: {
        padding: 0,
        paddingTop: 4,
        fontSize: '2rem',
      },
      action: {
        marginTop: -16,
      },
    },
  },
};

export default alert;

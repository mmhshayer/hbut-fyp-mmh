import {
  AlertProps as MuiAlertProps,
  default as MuiAlert,
} from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import { useLocale } from 'features/i18n';
import { FC, PropsWithChildren } from 'react';

interface AlertProps {
  title?: string;
}

const Alert: FC<PropsWithChildren<MuiAlertProps & AlertProps>> = ({
  children,
  title,
  severity,
  ...rest
}) => {
  // const t = useLocale();

  return (
    <MuiAlert severity={severity} {...rest}>
      <AlertTitle>
        {title && title}
        {/* {!title && severity === 'success'
          ? t('success', 'alerts')
          : severity === 'error'
          ? t('error', 'alerts')
          : severity === 'warning'
          ? t('warning', 'alerts')
          : t('info', 'alerts')} */}
        {!title && severity === 'success'
          ? 'Success'
          : severity === 'error'
          ? 'Error'
          : severity === 'warning'
          ? 'Warning'
          : 'Info'}
      </AlertTitle>
      {children}
    </MuiAlert>
  );
};

export default Alert;

import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormikContext } from 'formik';
import { FC, PropsWithChildren } from 'react';

const FormikSubmitButton: FC<PropsWithChildren<ButtonProps>> = ({
  variant = 'contained',
  color = 'primary',
  type = 'submit',
  sx,
  children,
}) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      sx={{ display: 'flex', alignItems: 'center', mt: 6, ...sx }}
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <CircularProgress
          color="inherit"
          size={'1rem'}
          sx={{
            color: (theme) =>
              theme.palette[color === 'inherit' ? 'primary' : color].main,
            my: 0.25,
            mr: 1,
          }}
        />
      )}
      {children}
    </Button>
  );
};

export default FormikSubmitButton;

import IconButton from '@mui/material/IconButton/IconButton';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps, GenericFieldHTMLAttributes } from 'formik';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import InputAdornment from '@mui/material/InputAdornment';
import { FC, useState } from 'react';

type FormikPasswordFieldProps = GenericFieldHTMLAttributes & {
  apiErrors?: string[];
  textFieldProps?: TextFieldProps;
};

const PasswordField: FC<TextFieldProps> = ({
  name = 'password',
  variant = 'outlined',
  fullWidth = true,
  placeholder = '******',
  label = 'Password',
  sx,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      name={name}
      type={showPassword ? 'text' : 'password'}
      variant={variant}
      label={label}
      fullWidth={fullWidth}
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={() => setShowPassword((s) => !s)}
          >
            <IconButton edge="end">
              {showPassword && <VisibilityOffSharpIcon />}
              {!showPassword && <VisibilitySharpIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ mt: 2, ...sx }}
      {...rest}
    />
  );
};

export default function FormikPasswordField({
  textFieldProps,
  apiErrors,
  ...rest
}: FormikPasswordFieldProps) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting },
      }: FieldProps<HTMLInputElement>) => (
        <PasswordField
          {...field}
          {...textFieldProps}
          disabled={isSubmitting}
          error={!!apiErrors || (touched && !!error)}
          helperText={
            apiErrors ? apiErrors[0] : touched && !!error && (error as string)
          }
        />
      )}
    </Field>
  );
}

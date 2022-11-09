import {
  default as MuiTextField,
  TextFieldProps,
} from '@mui/material/TextField';
import { Field, FieldProps, GenericFieldHTMLAttributes } from 'formik';

function TextField({
  variant = 'standard',
  fullWidth = true,
  sx,
  ...rest
}: TextFieldProps) {
  return (
    <MuiTextField
      variant={variant}
      fullWidth={fullWidth}
      sx={{ mt: 2, ...sx }}
      {...rest}
    />
  );
}

type FormikTextFieldProps = GenericFieldHTMLAttributes & {
  apiErrors?: string[];
  textFieldProps?: TextFieldProps;
};

export default function FormikTextField({
  textFieldProps,
  apiErrors,
  ...rest
}: FormikTextFieldProps) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting },
      }: FieldProps<HTMLInputElement>) => (
        <TextField
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

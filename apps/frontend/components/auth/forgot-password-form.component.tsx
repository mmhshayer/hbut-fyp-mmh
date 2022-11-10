import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Alert } from '../common';
import useApi from '../../features/api/use-api.hook';
import { FormikSubmitButton, FormikTextField } from '../form';
import { IForforPassword } from './auth.interface';
import { PageProps } from '../../shared';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is Required'),
});

const initialValues: IForforPassword = {
  email: '',
};

export default function ForgotPasswordForm({ sx }: PageProps) {
  const { data, loading, loaded, error, callApi } = useApi<IForforPassword>({
    url: '/auth/login',
    method: 'POST',
  });

  const onSubmit = async (
    values: IForforPassword,
    _: FormikHelpers<IForforPassword>
  ) => {
    await callApi({ email: values.email.trim() });
  };

  useEffect(() => {
    if (data && loaded) {
      toast.success('Password reset link sent to your email');
    }
  }, [data]);

  return (
    <Box sx={{ ...sx }}>
      <Card
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4">Forgot Password</Typography>

        {error?.statusMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error.statusMessage}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormikTextField
              name="email"
              textFieldProps={{
                label: 'Email',
                placeholder: 'smith@gmail.com',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormikSubmitButton>submit</FormikSubmitButton>
            </Box>
          </Form>
        </Formik>
      </Card>
    </Box>
  );
}

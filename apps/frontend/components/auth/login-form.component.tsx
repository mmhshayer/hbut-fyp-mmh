import Card from '@mui/material/Card/Card';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, PageLoader } from '../common';
import useApi from '../../features/api/use-api.hook';
import useAuth from '../../features/auth/use-auth.hook';
import {
  FormikPasswordField,
  FormikSubmitButton,
  FormikTextField,
} from '../form';
import { ILogin, LoginResponse } from './auth.interface';

interface LoginFormProps {
  sx?: SxProps;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const initialValues: ILogin = {
  email: '',
  password: '',
};

export default function LoginForm({ sx }: LoginFormProps) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { data, error, callApi } = useApi<LoginResponse, ILogin>({
    url: '/auth/login',
    method: 'POST',
  });

  const onSubmit = async (values: ILogin, _: FormikHelpers<ILogin>) => {
    const { email, ...rest } = values;
    await callApi({ email: email.trim(), ...rest });
  };

  useEffect(() => {
    if (data) {
      setLoading(true);
      login(data.access_token);
    }
  }, [data]);

  return (
    <PageLoader loading={loading}>
      <Box sx={{ ...sx }}>
        <Card
          sx={{
            p: 4,
          }}
        >
          <Typography variant="h4">Welcome Back</Typography>

          {error?.statusMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {/* {error.message && t(error.message)} */}
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
                // apiErrors={error?.validationErrors?.email}
                textFieldProps={{
                  // label: t('email_label'),
                  label: 'Email',
                  placeholder: 'smith@gmail.com',
                }}
              />

              <FormikPasswordField
                name="password"
                // apiErrors={error?.validationErrors?.password}
                textFieldProps={{
                  // label: t('password_label'),
                  label: 'Password',
                  placeholder: 'At least 6 characters',
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <FormikSubmitButton>{t('submit')}</FormikSubmitButton> */}
                <FormikSubmitButton>submit</FormikSubmitButton>
              </Box>
            </Form>
          </Formik>
        </Card>
      </Box>
    </PageLoader>
  );
}

import Card from '@mui/material/Card/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useApi from '../../features/api/use-api.hook';
import useAuth from '../../features/auth/use-auth.hook';
import { PageProps } from '../../shared';
import { Alert, LinkText, PageLoader } from '../common';
import {
  FormikPasswordField,
  FormikSubmitButton,
  FormikTextField,
} from '../form';
import { ILogin, LoginResponse } from './auth.interface';

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

export default function LoginForm({ sx }: PageProps) {
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
          <Typography variant="h4" align="center">
            Welcome Back
          </Typography>
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
                <FormikSubmitButton>Sign In</FormikSubmitButton>
              </Box>
            </Form>
          </Formik>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkText href="/forgot-password">Forgot Password?</LinkText>
            <Divider sx={{ my: 1 }}>or</Divider>
            <LinkText href="/register">Create New Account</LinkText>
          </Box>
        </Card>
      </Box>
    </PageLoader>
  );
}

import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, LinkText, PageLoader } from '../common';
import useApi from '../../features/api/use-api.hook';
import useAuth from '../../features/auth/use-auth.hook';
import {
  FormikPasswordField,
  FormikSubmitButton,
  FormikTextField,
} from '../form';
import { IRegister, LoginResponse } from './auth.interface';
import { PageProps } from '../../shared';
import { trimValues } from '../../shared/trim-values.util';
import Divider from '@mui/material/Divider';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
  passwordConfirmation: Yup.string()
    .required('Password Confirmation is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues: IRegister = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export default function RegisterForm({ sx }: PageProps) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { data, error, callApi } = useApi<LoginResponse, IRegister>({
    url: '/auth/register',
    method: 'POST',
  });

  const onSubmit = async (values: IRegister, _: FormikHelpers<IRegister>) => {
    const { name, email, password } = trimValues(values);
    await callApi({ name, email, password });
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
          <Typography variant="h4">Sign Up</Typography>
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
                name="name"
                // apiErrors={error?.validationErrors?.email}
                textFieldProps={{
                  label: 'Name',
                  placeholder: 'MD. John Doe',
                }}
              />
              <FormikTextField
                name="email"
                // apiErrors={error?.validationErrors?.email}
                textFieldProps={{
                  label: 'Email',
                  placeholder: 'smith@gmail.com',
                }}
              />
              <FormikPasswordField
                name="password"
                // apiErrors={error?.validationErrors?.password}
                textFieldProps={{
                  label: 'Password',
                  placeholder: 'At least 6 characters',
                }}
              />
              <FormikPasswordField
                name="passwordConfirmation"
                // apiErrors={error?.validationErrors?.password}
                textFieldProps={{
                  label: 'Password Confirmation',
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
                <FormikSubmitButton>submit</FormikSubmitButton>
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
            <LinkText href="/login">Already have an account?</LinkText>
          </Box>
        </Card>
      </Box>
    </PageLoader>
  );
}

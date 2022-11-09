import Card from '@mui/material/Card/Card';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { PageLoader } from '../common';
import useApi from '../../hooks/api/use-api.hook';
import {
  FormikPasswordField,
  FormikSubmitButton,
  FormikTextField,
} from '../form';

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

interface ILogin {
  email: string;
  password: string;
}

const initialValues: ILogin = {
  email: '',
  password: '',
};
interface LoginResponse {
  accessToken: string;
}

export default function LoginForm({ sx }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const { data, error, callApi } = useApi<LoginResponse, ILogin>({
    url: '/auth/login',
    method: 'POST',
    data: {
      username: 'mustakim',
      password: '123456',
    },
  });

  const onSubmit = async (values: ILogin, _: FormikHelpers<ILogin>) => {
    // use await to get the form disabling effect
    const { email, ...rest } = values;
    // await callApi({ username: email.trim(), ...rest });
    await callApi({ username: 'mustakim', password: '123456' });
    console.log('values', values);
  };

  console.log('data', data);
  console.log('error', error);

  return (
    <PageLoader loading={loading}>
      <Box sx={{ ...sx }}>
        <Card
          sx={{
            p: 4,
          }}
        >
          <Typography variant="h4">Welcome Back</Typography>

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

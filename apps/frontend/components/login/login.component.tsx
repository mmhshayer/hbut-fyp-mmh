import Card from '@mui/material/Card/Card';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { PageLoader } from '../common';
import {
  FormikPasswordField,
  FormikSubmitButton,
  FormikTextField,
} from '../form/';

interface LoginFormProps {
  sx?: SxProps;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('email format error')
    .required('email required error'),
  password: Yup.string().required('password required error'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};
interface LoginResponse {
  accessToken: string;
}

export default function LoginForm({ sx }: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    values: LoginFormValues,
    _: FormikHelpers<LoginFormValues>
  ) => {
    // use await to get the form disabling effect
    const { email, ...rest } = values;
    // await callApi({ email: email.trim(), ...rest });
    console.log('values', values);
  };

  return (
    <PageLoader loading={loading}>
      <Box sx={{ ...sx }}>
        <Card
          sx={{
            p: '',
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
                  label: 'email_label',
                  placeholder: 'smith@gmail.com',
                }}
              />

              <FormikPasswordField
                name="password"
                // apiErrors={error?.validationErrors?.password}
                textFieldProps={{
                  // label: t('password_label'),
                  label: 'password_label',
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

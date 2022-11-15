import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, PageLoader } from '../common';
import useApi from '../../features/api/use-api.hook';
import useAuth from '../../features/auth/use-auth.hook';
import { FormikSubmitButton, FormikTextField } from '../form';
import { IRegisterCompany, LoginResponse } from './auth.interface';
import { PageProps } from '../../shared';
import { trimValues } from '../../shared/trim-values.util';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const initialValues: IRegisterCompany = {
  name: '',
};

export default function RegisterForm({ sx }: PageProps) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { data, error, callApi } = useApi<LoginResponse, IRegisterCompany>({
    url: '/auth/register',
    method: 'POST',
  });

  const onSubmit = async (
    values: IRegisterCompany,
    _: FormikHelpers<IRegisterCompany>
  ) => {
    const { name } = trimValues(values);
    // await callApi({ name, email, password });
    console.log({ name });
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
          <Typography variant="h4">Register Company</Typography>

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
    </PageLoader>
  );
}

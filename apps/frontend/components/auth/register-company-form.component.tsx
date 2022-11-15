import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { useUser } from '../../features/user';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Yup from 'yup';
import useApi from '../../features/api/use-api.hook';
import { PageProps } from '../../shared';
import { trimValues } from '../../shared/trim-values.util';
import { Alert, PageLoader } from '../common';
import { FormikSubmitButton, FormikTextField } from '../form';
import { IRegisterCompany } from './auth.interface';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const initialValues: IRegisterCompany = {
  name: '',
};

export default function RegisterForm({ sx }: PageProps) {
  const router = useRouter();
  // const { addCompany } = useUser();

  const { data, loading, error, callApi } = useApi<any, IRegisterCompany>({
    url: '/company/',
    method: 'POST',
  });

  const onSubmit = async (
    values: IRegisterCompany,
    _: FormikHelpers<IRegisterCompany>
  ) => {
    const company = trimValues(values);
    await callApi(company as IRegisterCompany);
    console.log(data);
  };

  // useEffect(() => {
  //   if (data) {
  //     addCompany(data);
  //     setTimeout(() => {
  //       router.push('/dashboard');
  //     }, 1000);
  //   }
  // }, [data]);

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

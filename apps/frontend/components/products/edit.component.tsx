import { Box, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { PageProps } from '../../shared/page.interface';
import { PageLoader } from '../common';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import FormikTextField from '../form/formik-text-field.component';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FormikSubmitButton } from '../form';
import { useApi } from '../../features/api';
import { useRouter } from 'next/router';
import { useUser } from '../../features/user';

const initialValues = {
    name: '',
    description: '',
    price: 0,
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
})



export default function ProductEdit({ sx }: PageProps) {
    const router = useRouter();
    const { currentCompany } = useUser();
    const [product, setProduct] = useState(initialValues);

    const { data, loading, loaded, error, callApi } = useApi({
        url: `/products/${currentCompany._id}`,
        method: 'POST',
        lazy: true,
    })

    const onSubmit = async (values: any) => {
        await callApi({
            ...values
        });
    };

    useEffect(() => {
        if (data) {
            toast.success('Product added successfully');
            router.push(`/dashboard/products`);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error(error.statusMessage);
        }
    }, [error])

    return (
        <PageLoader loading={!router.isReady}>
            <Box component={Paper} sx={sx}>
                <Typography variant='h3'>
                    Edit Product
                </Typography>
                <Formik
                    initialValues={product}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <FormikTextField
                            name='name'
                            required
                            textFieldProps={{
                                label: 'Name',
                            }}
                        />
                        <FormikTextField
                            name='description'
                            required
                            textFieldProps={{
                                label: 'Description',
                                multiline: true,
                                rows: 4,
                            }}
                        />
                        <FormikTextField
                            name='price'
                            required
                            textFieldProps={{
                                label: 'Price',
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FormikSubmitButton>Add Product</FormikSubmitButton>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </PageLoader>
    )
}

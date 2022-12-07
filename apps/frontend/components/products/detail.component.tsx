import { Box, Grid, Typography } from '@mui/material';
import { useApi } from '../../features/api';
import { useRouter } from 'next/router';
import { PageProps } from '../../shared/page.interface';
import { useEffect } from 'react';
import { PageLoader } from '../common';
import Image from 'next/image'

export default function ProductDetail({ sx }: PageProps) {
    const router = useRouter();
    const { product } = router.query;
    const { data, loading, loaded, error, callApi } = useApi({
        url: `/products/${product}`,
        lazy: true
    });

    useEffect(() => {
        callApi();
    }, [router.isReady])

    if (error) {
        return <Box sx={{ color: 'error.main' }}>Error</Box>
    }


    return (
        <PageLoader loading={loading}>
            {data && (
                <Grid container spacing={2} sx={{
                    ...sx,
                }}>
                    <Image src='/placeholder-400x400.jpg' width={400} height={400} alt={'Product Image'} />
                    <Box sx={{
                        pl: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Typography variant='h4'>
                            {data?.name}
                        </Typography>
                        <Typography variant='h4'>
                            {data?.description}
                        </Typography>
                        <Typography variant='h4'>
                            {data?.price} BDT
                        </Typography>
                    </Box>
                </Grid>
            )}
        </PageLoader>
    )
}

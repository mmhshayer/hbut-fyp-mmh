import { Box, Grid, Paper, Typography } from '@mui/material';
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

    console.log(data)

    useEffect(() => {
        callApi();
    }, [router.isReady])

    if (error) {
        return <Box sx={{ color: 'error.main' }}>Error</Box>
    }


    return (
        <PageLoader loading={loading}>
            {data && loaded && (
                <Grid container spacing={{
                    sm: 2,
                    md: 16,
                }}
                    component={Paper}
                    sx={{
                        p: 4,
                        ...sx
                    }}
                >
                    <Grid item md={4}>
                        <Image src='/placeholder-400x400.jpg' width={400} height={400} alt={'Product Image'} />
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            pl: {
                                md: 4
                            }
                        }}>
                            <Typography variant='h4'>
                                {`${data?.name}`} -  {`${data?.price}`} BDT
                            </Typography>
                            <Typography variant='body2' >
                                {`${data?.description}`}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </PageLoader>
    )
}

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useApi from '../../features/api/use-api.hook';
import { PageProps } from '../../shared/page.interface';
import PageLoader from '../common/page-loader.component';
import { Box, Typography } from '@mui/material';
import { Company } from '../../features/user';
import { ProductCard } from '../products';

export default function CompanyDetail({ sx }: PageProps) {
    const router = useRouter();
    const { company } = router.query;

    const { data: companyInfo } = useApi<Company>({
        url: `/company/${company}`,
    });

    const companyProducts = useApi<any[]>({
        url: `/products/company/${companyInfo?._id}`,
        lazy: true,
    })

    useEffect(() => {
        if (companyInfo?._id) {
            companyProducts.callApi();
        }
    }, [companyInfo?._id])


    return (
        <PageLoader loading={false}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="h1" >
                    {companyInfo?.name}
                </Typography>
                <Typography variant="caption">
                    {companyInfo?.status}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
                p: 2,
            }}>
                {companyProducts.data?.map((product, index) => <ProductCard key={index} product={product} />)}
            </Box>

        </PageLoader>
    )
}

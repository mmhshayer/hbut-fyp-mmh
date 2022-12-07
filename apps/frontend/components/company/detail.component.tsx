import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useApi from '../../features/api/use-api.hook';
import { PageProps } from '../../shared/page.interface';


export default function CompanyDetail({ sx }: PageProps) {
    const router = useRouter();
    const { company } = router.query;

    const { data, loading, loaded, error, callApi } = useApi({
        url: `/company/${company}`,
        lazy: true
    });

    useEffect(() => {
        callApi();
    }, [router.isReady])

    console.log(data);

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>CompanyDetails</div>
    )
}

import { useEffect } from 'react';
import { useUser } from '../../features/user';
import useApi from '../../features/api/use-api.hook';


export default function OrderList() {
    const { currentCompany } = useUser()
    const { data, loading, callApi } = useApi({
        url: `/orders/company/${currentCompany._id}`,
        method: 'GET',
        lazy: true,
    });

    useEffect(() => {
        if (currentCompany) {
            callApi()
        }
    }, [currentCompany])

    useEffect(() => {
        if (!loading && data) {
            console.log(data)
        }
    }, [data])

    return (
        <div>OrderList</div>
    )
}

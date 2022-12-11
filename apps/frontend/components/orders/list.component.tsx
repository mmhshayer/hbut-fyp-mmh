import { useEffect, useState } from 'react';
import { useUser } from '../../features/user';
import useApi from '../../features/api/use-api.hook';
import { PageLoader } from '../common';
import { Order } from './order.interface';
import MUIDataTable from 'mui-datatables';
import ConfirmDialog from '../common/confirm-dialog.component';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function OrderList() {
    const { currentCompany } = useUser()
    const [target, setTarget] = useState<Order>(null)
    const [showPrompt, setShowPrompt] = useState(false);
    const [orders, setOrders] = useState<Order[]>([])

    const { data, loading, callApi } = useApi<Order[]>({
        url: `/orders/company/${currentCompany._id}`,
        method: 'GET',
        lazy: true,
    });

    const deliverOrder = useApi({
        url: `/orders/${target?._id}`,
        method: 'PUT',
    });

    useEffect(() => {
        if (currentCompany) {
            callApi()
        }
    }, [currentCompany])

    useEffect(() => {
        if (!loading && data) {
            setOrders(data)
        }
    }, [data])

    const onPromptClose = () => {
        setShowPrompt(false);
    };

    const onPromptAccept = async () => {
        await deliverOrder.callApi();
    };

    const tableData = orders?.map(i => ({
        createdAt: i.createdAt,
        total: i.total,
        status: i.status,
        actions: (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'left',

            }}>
                <Box>
                    <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        onClick={() => {
                            setTarget(i);
                            setShowPrompt(true);
                        }}
                        sx={{
                            m: 1,
                        }}
                    >
                        Set Delivered
                    </Button>
                </Box>
            </Box>
        ),
    }));

    return (
        <PageLoader loading={loading}>
            <MUIDataTable
                title='All Products'
                columns={columns}
                data={tableData}
                options={{
                    print: false,
                    selectableRows: undefined,
                    downloadOptions: {
                        filename: 'products.csv',
                        filterOptions: {
                            useDisplayedColumnsOnly: true,
                            useDisplayedRowsOnly: true,
                        },
                    },
                }}
            />
            <ConfirmDialog
                title='Deliver Order'
                description='Are you sure you want to deliver this order?'
                open={showPrompt}
                loading={deliverOrder.loading}
                onClose={onPromptClose}
                onAccept={onPromptAccept}
            />
        </PageLoader>
    )
}

const columns = [
    {
        name: 'createdAt',
        label: 'Date',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'status',
        label: 'Status',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'total',
        label: 'Total',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'actions',
        label: 'Actions',
        options: {
            filter: false,
            sort: false,
            download: false,
        },
    },
];
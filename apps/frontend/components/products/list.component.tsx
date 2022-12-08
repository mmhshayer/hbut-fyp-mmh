import Link from 'next/link';
import { useApi } from '../../features/api';
import { useUser } from '../../features/user';
import { useEffect, useState } from 'react';
import { ConfirmDialog, LinkButton, PageLoader } from '../common';
import MUIDataTable from 'mui-datatables';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import Box from '@mui/system/Box/Box';
import { Product } from './product.interface';


export default function ProductList() {
    const { currentCompany } = useUser()
    const [target, setTarget] = useState<Product>(null)
    const [showPrompt, setShowPrompt] = useState(false);
    const [products, setProducts] = useState<Product[]>([])

    const { data, loading, error } = useApi<Product[]>({
        url: `/products/company/${currentCompany._id}`,
    })

    const deleteProduct = useApi({
        url: `/products/${target?.permalink}`,
        method: 'DELETE',
    });

    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])

    const onPromptClose = () => {
        setShowPrompt(false);
    };

    const onPromptAccept = async () => {
        await deleteProduct.callApi();
    };


    useEffect(() => {
        if (deleteProduct.data && target?.permalink) {
            setProducts(products =>
                products.filter(item => item.permalink !== target.permalink)
            );
            toast.success('Product deleted successfully');
            setShowPrompt(false);
            setTarget(null);
        }
    }, [deleteProduct.data, target]);

    useEffect(() => {
        if (deleteProduct.error) {
            toast.error('Failed to delete this product');
            setShowPrompt(false);
            setTarget(null);
        }
    }, [deleteProduct.error]);

    if (error) {
        return (
            <div>
                Can Not Load Products
            </div>
        )
    }

    const CustomToolBar = () => (
        <>
            <LinkButton href={`/dashboard/products/create`}>
                Add New
            </LinkButton>
        </>
    )

    const tableData = products?.map(i => ({
        title: i.name,
        permalink: (
            <Link href={`/${currentCompany.permalink}/${i.permalink}`} style={{
                textDecoration: 'none',
                color: 'inherit',
            }}>
                {i.permalink}
            </Link>
        ),
        price: i.price,
        isPublished: i.isPublished ? 'Yes' : 'No',
        actions: (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'left',

            }}>
                <Box>
                    <LinkButton href={`/${currentCompany.permalink}/${i.permalink}`}>
                        View
                    </LinkButton>
                </Box>
                <Box>
                    <LinkButton href={`/dashboard/products/${i?.permalink}`}>
                        Edit
                    </LinkButton>
                </Box>
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
                        Delete
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
                    customToolbar: CustomToolBar,
                }}
            />
            <ConfirmDialog
                title='Delete Product'
                description='Are you sure you want to remove this Product?'
                open={showPrompt}
                loading={deleteProduct.loading}
                onClose={onPromptClose}
                onAccept={onPromptAccept}
            />
        </PageLoader>
    )
};

const columns = [
    {
        name: 'title',
        label: 'Title',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'permalink',
        label: 'Permalink',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'price',
        label: 'Price',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'isPublished',
        label: 'Published',
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
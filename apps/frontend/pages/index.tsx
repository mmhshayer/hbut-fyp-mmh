import { Typography, Box } from '@mui/material';
import { ProductCard } from '../components/products';
import { useApi } from '../features/api';

export function Index() {
  const { data } = useApi<Array<any>>({
    url: '/products',
  })

  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: 'center' }}
      >Hot Items</Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        p: 2,
      }}>
        {data ? data.map((product, index) => <ProductCard key={index} product={product} />) : <p>No Products</p>}
      </Box>
    </>
  );
}

export default Index;

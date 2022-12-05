import { Typography } from '@mui/material';
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
      >Hungry ?</Typography>
      {data ? data.map((product, index) => <ProductCard key={index} product={product} />) : <p>No Products</p>}
    </>
  );
}

export default Index;

import { AppProps } from 'next/app';
import { Defaultlayout } from '../layouts';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Defaultlayout>
        <Component {...pageProps} />
      </Defaultlayout>
    </>
  );
}

export default App;

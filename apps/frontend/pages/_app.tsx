import { AppProps } from 'next/app';
import { GlobalProviders } from '../global';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProviders>
        <Component {...pageProps} />
      </GlobalProviders>
    </>
  );
}

export default CustomApp;

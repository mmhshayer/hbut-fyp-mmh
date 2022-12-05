import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProviders } from '../features/global';
import { DashboardRoute } from '../features/router/router.config';
import { DashboardLayout, DefaultLayout } from '../layouts';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { asPath } = useRouter();
  const isDashboardRoute = asPath.startsWith(DashboardRoute);

  const getLayout =
    Component.getLayout ??
    (page => (
      <GlobalProviders>
        {isDashboardRoute ? (<DashboardLayout>{page}</DashboardLayout>) : (<DefaultLayout>{page}</DefaultLayout>)}
        <ToastContainer />
      </GlobalProviders>
    ));


  return getLayout(
    <Component {...pageProps} />
  );
}

export default App;


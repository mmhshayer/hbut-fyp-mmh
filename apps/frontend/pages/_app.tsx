import { AppProps } from 'next/app';
import { Defaultlayout } from '../layouts';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Defaultlayout>
        <Component {...pageProps} />
        <ToastContainer />
      </Defaultlayout>
    </>
  );
}

export default App;

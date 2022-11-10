import { FC, PropsWithChildren } from 'react';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navbar';
import { GlobalProviders } from '../features/global';
import PageBody from './page-body.component';

const Defaultlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GlobalProviders>
      <NavBar />
      <PageBody>{children}</PageBody>
      <Footer />
    </GlobalProviders>
  );
};

export default Defaultlayout;

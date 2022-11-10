import { FC, PropsWithChildren } from 'react';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navbar';
import { GlobalProviders } from '../features/global';

const Defaultlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GlobalProviders>
      <NavBar />
      {children}
      <Footer />
    </GlobalProviders>
  );
};

export default Defaultlayout;

import { FC, PropsWithChildren } from 'react';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navbar';
import PageBody from './page-body.component';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <PageBody>{children}</PageBody>
      <Footer />
    </>
  );
};

export default DefaultLayout;

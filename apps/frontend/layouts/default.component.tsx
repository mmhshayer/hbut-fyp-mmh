import { FC, PropsWithChildren } from 'react';
import { NavBar } from '../components/navbar';
import { GlobalProviders } from '../global';

const Defaultlayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GlobalProviders>
      <NavBar />
      {children}
    </GlobalProviders>
  );
};

export default Defaultlayout;

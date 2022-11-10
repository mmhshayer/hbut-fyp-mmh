import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageLoader } from '../common';
import useAuth from '../../features/auth/use-auth.hook';


export default function Logout() {
  const { logout, loaded } = useAuth();
  const {
    push,
    query: { next = '/' },
  } = useRouter();

  useEffect(() => {
    if (loaded) {
      logout();
      push(`${next}`);
    }
  }, [loaded]);

  return <PageLoader loading />;
}

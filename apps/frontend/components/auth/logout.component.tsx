import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageLoader } from '../common';
import useAuth from '../../features/auth/use-auth.hook';
import { UserDashboard } from './route-guard.config';

export default function Logout() {
  const { logout, loaded } = useAuth();
  const {
    push,
    query: { next = '/' },
  } = useRouter();

  useEffect(() => {
    if (loaded) {
      logout();
      push(`${UserDashboard}?next=${next}`);
    }
  }, [loaded]);

  return <PageLoader loading />;
}

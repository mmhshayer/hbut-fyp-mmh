import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';
import PageLoader from '../../components/common/page-loader.component';
import { ShowContentAdvice } from './router.enum';
import useRouteGuard from './router.hook';

interface RedirectProps {
  to: string;
}

function Redirect({ to }: RedirectProps) {
  const { push } = useRouter();

  useEffect(() => {
    push(to);
  }, [to]);

  return <></>;
}

const RouteGuard: FC<PropsWithChildren> = ({ children }) => {
  const { showContent, redirect, redirectRoute } = useRouteGuard();

  if (showContent === ShowContentAdvice.Show) {
    return <>{children}</>;
  }

  if (redirect) {
    return <Redirect to={redirectRoute} />;
  }

  return <PageLoader fullHeight loading />;
};

export default RouteGuard;

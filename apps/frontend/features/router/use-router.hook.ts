import { useContext } from 'react';
import RouteGuardContext from './router.context';

export default function useRouteGuard() {
  const { dispatch: _, ...rest } = useContext(RouteGuardContext);
  return rest;
}

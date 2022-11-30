import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useAuth } from '../auth';
import { useUser } from '../user';
import {
  HomeRoute,
  LoginRoute,
  LogoutRoute,
  PublicOnlyRoutes,
  PublicRoutes,
  LoggedInRoutes,
} from './router.config';
import RouteGuardContext from './router.context';
import {
  RouteGuardActionType,
  RouteType,
  ShowContentAdvice,
} from './router.enum';
import RouteGuardReducer, { RouteGuardInitialValue } from './router.reducer';

const RouteGuardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    RouteGuardReducer,
    RouteGuardInitialValue
  );
  const { token, loaded: tokenLoaded } = useAuth();
  const { user } = useUser();
  const {
    asPath,
    pathname,
    isReady,
    query: { next = '' },
  } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const routeAdvice = {
      showContent: ShowContentAdvice.CantDecide,
      redirect: false,
      targetRoute: asPath,
      redirectRoute: next as string,
      targetRouteType: RouteType.Private,
    };

    // Log Out is always available
    if (asPath.startsWith(LogoutRoute)) {
      routeAdvice.showContent = ShowContentAdvice.Show;
      dispatch({
        action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
        payload: routeAdvice,
      });
      return;
    }

    PublicRoutes.forEach((route) => {
      if (asPath.startsWith(route)) {
        routeAdvice.targetRouteType = RouteType.Public;
      }
    });

    PublicOnlyRoutes.forEach((route) => {
      if (asPath.startsWith(route)) {
        routeAdvice.targetRouteType = RouteType.PublicOnly;
      }
    });

    LoggedInRoutes.forEach((route) => {
      if (asPath.startsWith(route)) {
        routeAdvice.targetRouteType = RouteType.LoggedIn;
      }
    });

    if (user) {
      if (routeAdvice.targetRouteType === RouteType.PublicOnly) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = HomeRoute;
      } else {
        routeAdvice.showContent = ShowContentAdvice.Show;
      }
    }

    if (!user) {
      if (routeAdvice.targetRouteType === RouteType.LoggedIn) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = HomeRoute;
      } else {
        routeAdvice.showContent = ShowContentAdvice.Show;
      }
    }

    if (tokenLoaded && !token) {
      if (routeAdvice.targetRouteType === RouteType.Private) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = `${LoginRoute}?next=${next || asPath}`;
      } else {
        routeAdvice.showContent = ShowContentAdvice.Show;
      }
    }

    dispatch({
      action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
      payload: routeAdvice,
    });
  }, [isReady, user, asPath, tokenLoaded]);

  return (
    <RouteGuardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RouteGuardContext.Provider>
  );
};

export default RouteGuardProvider;

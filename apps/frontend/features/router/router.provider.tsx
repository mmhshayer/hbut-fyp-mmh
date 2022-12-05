import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useAuth } from '../auth';
import { useUser } from '../user';
import {
  DashboardRoute, HomeRoute, LogInRoute,
  LogOutRoute, PrivateRoutes, PublicOnlyRoutes, SelectCompanyRoute
} from './router.config';
import RouteGuardContext from './router.context';
import {
  RouteGuardActionType,
  RouteType,
  ShowContentAdvice
} from './router.enum';
import RouteGuardReducer, { RouteGuardInitialValue } from './router.reducer';

const RouteGuardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    RouteGuardReducer,
    RouteGuardInitialValue
  );
  const { token, loaded: tokenLoaded } = useAuth();
  const { user, currentCompany } = useUser();
  const {
    asPath,
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

    /*
      Log Out is always available
    */
    if (asPath.startsWith(LogOutRoute)) {
      routeAdvice.showContent = ShowContentAdvice.Show;
      dispatch({
        action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
        payload: routeAdvice,
      });
      return;
    }

    /*
      Routes Extending Home is Public
    */
    if (asPath.startsWith(HomeRoute)) {
      routeAdvice.targetRouteType = RouteType.Public;
    }

    PublicOnlyRoutes.forEach((route) => {
      if (asPath.startsWith(route)) {
        routeAdvice.targetRouteType = RouteType.PublicOnly;
      }
    });

    PrivateRoutes.forEach((route) => {
      if (asPath.startsWith(route)) {
        routeAdvice.targetRouteType = RouteType.Private;
      }
    });


    /*
      user LoggedIn
      - if route is public only, redirect to home
      - if route is private, show content
      - if route is public, show content
    */
    if (user) {
      if (routeAdvice.targetRouteType === RouteType.PublicOnly) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = HomeRoute;
      } else {
        routeAdvice.showContent = ShowContentAdvice.Show;
      }
    }

    /*
      If path starts with Dashboard
        check if user is logged in and has company 
        if not, redirect to select company
        if user is not logged in, redirected to login with select-company as next
        else show content
    */
    if (asPath.startsWith(DashboardRoute)) {
      if (user && currentCompany) {
        routeAdvice.showContent = ShowContentAdvice.Show;
      } else {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = SelectCompanyRoute;
      }
    }

    if (tokenLoaded && !token) {
      if (routeAdvice.targetRouteType === RouteType.Private) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = `${LogInRoute}?next=${next || asPath}`;
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

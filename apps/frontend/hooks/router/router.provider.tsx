import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useAuth } from '../auth';
import {
  LoginRoute,
  LogoutRoute,
  PublicOnlyRoutes,
  PublicRoutes,
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
  // const { user, currentCompany } = useUser();
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

    // // we have to guard admin user from accessing company
    // // routes and other users from admin routes
    // if (user) {
    //   const isAdmin = AdminUserTypes.some((t) => t === user.userType);
    //   if (isAdmin && asPath.startsWith(AdminRoutesPrefix)) {
    //     routeAdvice.showContent = ShowContentAdvice.Show;
    //     routeAdvice.redirect = false;
    //     routeAdvice.redirectRoute = '';
    //     dispatch({
    //       action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
    //       payload: routeAdvice,
    //     });
    //     return;
    //   } else if (isAdmin && !asPath.startsWith(AdminRoutesPrefix)) {
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = (next as string) || AdminDashboard;
    //     /* console.log({ ...routeAdvice }); */
    //     dispatch({
    //       action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
    //       payload: routeAdvice,
    //     });
    //     return;
    //   } else if (!isAdmin && asPath.startsWith(AdminRoutesPrefix)) {
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = (next as string) || UserDashboard;
    //     /* console.log({ ...routeAdvice }); */
    //     dispatch({
    //       action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
    //       payload: routeAdvice,
    //     });
    //     return;
    //   }
    // }

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

    // const isPrivateRouteWithoutCurrentCompany =
    //   PrivateRoutesWithoutCurrentCompany.some((route) => pathname === route);

    // const isSubaccountBlacklist = SubaccountBlacklist.some(
    //   (route) => pathname === route
    // );

    /* rules for non-admin users only */

    // both user and current company is avaiable
    // if (user && currentCompany) {
    //   const companyRole = user.companyRoles.find(
    //     (role) => role.companyId === currentCompany._id
    //   );
    //   const isSubaccount = companyRole?.role === RoleAtCompany.SubAccount;

    //   if (asPath.startsWith(CompanySelectionRoute)) {
    //     // redirect to homepage cause current company is already selected
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = UserDashboard;
    //   } else if (routeAdvice.targetRouteType === RouteType.PublicOnly) {
    //     // redirect only if the route is public only
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = UserDashboard;
    //   } else if (isSubaccount && isSubaccountBlacklist) {
    //     // redirect if subaccount trying to access blacklisted route
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = UserDashboard;
    //   } else {
    //     // show otherwise
    //     routeAdvice.showContent = ShowContentAdvice.Show;
    //   }
    // }

    // only user is available not current company
    // if (user && !currentCompany) {
    //   // we redirect to after login route based on the assumption
    //   // that current company needs to be selected first
    //   if (isPrivateRouteWithoutCurrentCompany) {
    //     routeAdvice.showContent = ShowContentAdvice.Show;
    //   } else if (asPath.startsWith(CompanySelectionRoute)) {
    //     routeAdvice.showContent = ShowContentAdvice.Show;
    //   } else {
    //     routeAdvice.showContent = ShowContentAdvice.Hide;
    //     routeAdvice.redirect = true;
    //     routeAdvice.redirectRoute = CompanySelectionRoute;
    //   }
    // }

    // token is loaded but empty
    if (tokenLoaded && !token) {
      // we must redirect if its private route
      if (routeAdvice.targetRouteType === RouteType.Private) {
        routeAdvice.showContent = ShowContentAdvice.Hide;
        routeAdvice.redirect = true;
        routeAdvice.redirectRoute = `${LoginRoute}?next=${next || asPath}`;
      } else {
        // show otherwise
        routeAdvice.showContent = ShowContentAdvice.Show;
      }
    }

    dispatch({
      action: RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA,
      payload: routeAdvice,
    });
    // }, [isReady, asPath, user, tokenLoaded, currentCompany]);
  }, [isReady, asPath, tokenLoaded]);

  return (
    <RouteGuardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RouteGuardContext.Provider>
  );
};

export default RouteGuardProvider;

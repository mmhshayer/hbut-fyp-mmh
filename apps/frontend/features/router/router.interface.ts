import { RouteType, ShowContentAdvice } from './router.enum';

export type RouteGuardReducerStateType = {
  showContent: ShowContentAdvice;
  redirect: boolean;
  targetRoute: string;
  redirectRoute: string;
  targetRouteType: RouteType;
};

export type RouteGuardReducerActionType = {
  action: string;
  payload?: RouteGuardReducerStateType;
};

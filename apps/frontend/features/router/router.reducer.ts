import { Reducer } from 'react';
import {
  RouteGuardActionType,
  RouteType,
  ShowContentAdvice,
} from './router.enum';
import {
  RouteGuardReducerActionType,
  RouteGuardReducerStateType,
} from './router.interface';

export const RouteGuardInitialValue: RouteGuardReducerStateType = {
  showContent: ShowContentAdvice.CantDecide,
  redirect: false,
  targetRoute: '',
  redirectRoute: '',
  targetRouteType: RouteType.Private,
};

const RouteGuardReducer: Reducer<
  RouteGuardReducerStateType,
  RouteGuardReducerActionType
> = (state, action) => {
  switch (action.action) {
    case RouteGuardActionType.UPDATE_ROUTE_GUARD_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default RouteGuardReducer;

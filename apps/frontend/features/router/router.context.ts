import { createContext, Dispatch } from 'react';
import {
  RouteGuardReducerActionType,
  RouteGuardReducerStateType,
} from './router.interface';
import { RouteGuardInitialValue } from './router.reducer';

type RouteGuardContextType = RouteGuardReducerStateType & {
  dispatch?: Dispatch<RouteGuardReducerActionType>;
};

const initialValue: RouteGuardContextType = {
  ...RouteGuardInitialValue,
};

const RouteGuardContext = createContext(initialValue);

export default RouteGuardContext;

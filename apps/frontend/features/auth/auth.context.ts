import { createContext, Dispatch } from 'react';
import { AuthReducerStateType, AuthReducerActionType } from './auth.reducer';

type AuthContextType = AuthReducerStateType & {
  dispatch?: Dispatch<AuthReducerActionType>;
};

const initialState: AuthContextType = {
  token: '',
  loaded: false,
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;

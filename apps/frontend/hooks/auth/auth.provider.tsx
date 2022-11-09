import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { AuthActionType } from './auth-action.enum';
import { readAuthToken, readBackupAuthToken } from './auth.utils';
import { LocalStorageAccessTokenKey } from './constants';

import AuthContext from './auth.context';
import AuthReducer from './auth.reducer';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: '',
    loaded: false,
  });

  // load already stored auth token on first load
  useEffect(() => {
    const token = readAuthToken();
    const backupToken = readBackupAuthToken();
    dispatch({
      action: AuthActionType.SET_TOKEN_LOADED,
      payload: { token, backupToken, loaded: true },
    });
  }, []);

  // subscribe to auth token change in local storage
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === LocalStorageAccessTokenKey) {
        dispatch({
          action: AuthActionType.SET_TOKEN_LOADED,
          payload: { token: event.newValue || '', loaded: true },
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

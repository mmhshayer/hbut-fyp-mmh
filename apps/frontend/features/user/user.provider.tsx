import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useApi } from '../api';
import { useAuth } from '../auth';
import { LogoutRoute } from '../router/router.config';
import UserContext from './user.context';
import { UserActionType } from './user.enum';
import { User } from './user.interface';
import UserReducer from './user.reducer';

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {});
  const { token, loaded: tokenLoaded } = useAuth();
  const { asPath } = useRouter();

  const {
    data: userData,
    callApi: callUserApi,
    loading: userLoading,
  } = useApi<User>({ url: '/whoami', lazy: true });

  useEffect(() => {
    if (!tokenLoaded) {
      return;
    }
    if (tokenLoaded && !token) {
      dispatch({ action: UserActionType.DESTROY_SESSION });
    }
    if (token && !state.user && !userLoading) {
      if (!asPath.startsWith(LogoutRoute)) {
        callUserApi();
      }
    }
  }, [token, tokenLoaded, userLoading, asPath, state.user]);

  useEffect(() => {
    if (userData) {
      dispatch({
        action: UserActionType.SET_USER,
        payload: {
          user: userData,
        },
      });
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useApi } from '../api';
import { useAuth } from '../auth';
import { LogOutRoute } from '../router/router.config';
import Company from './company.interface';
import { LocalStorageCurrentCompanyKey } from './extended/constants';
import { readCurrentCompanyId } from './extended/user.utils';
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

  const {
    data: companyListData,
    callApi: callCompanyListApi,
    loading: companyListLoading,
  } = useApi<Company[]>({ url: '/company/list', lazy: true });

  useEffect(() => {
    if (!tokenLoaded) {
      return;
    }
    if (tokenLoaded && !token) {
      dispatch({ action: UserActionType.DESTROY_SESSION });
    }
    if (token && !state.user && !userLoading) {
      if (!asPath.startsWith(LogOutRoute)) {
        callUserApi();
      }
    }
    if (token && !state.companies && !companyListLoading) {
      if (!asPath.startsWith(LogOutRoute)) {
        callCompanyListApi();
      }
    }
  }, [
    token,
    tokenLoaded,
    userLoading,
    companyListLoading,
    asPath,
    state.user,
    state.companies,
  ]);

  useEffect(() => {
    if (userData && companyListData) {
      let currentCompany: Company | null = null;
      if (!currentCompany) {
        const prevCurrentCompanyId = readCurrentCompanyId();
        if (prevCurrentCompanyId) {
          const filtered = companyListData.filter(
            (company) => company._id === prevCurrentCompanyId
          );
          if (filtered.length > 0) {
            currentCompany = filtered[0];
          }
        }
      }

      dispatch({
        action: UserActionType.SET_USER_COMPANY_DATA,
        payload: {
          user: userData,
          companies: companyListData,
          ...(currentCompany && { currentCompany }),
        },
      });
    }
  }, [userData, companyListData]);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === LocalStorageCurrentCompanyKey && companyListData) {
        const currentCompanyId = event.newValue;
        const filtered = companyListData.filter(
          (company) => company._id === currentCompanyId
        );
        if (filtered.length > 0) {
          dispatch({
            action: UserActionType.SET_CURRENT_COMPANY,
            payload: {
              currentCompany: filtered[0],
            },
          });
        }
      }
    });
  }, [companyListData]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};;;

export default UserProvider;

import { AxiosError, AxiosRequestConfig } from 'axios';
// import { LogoutRoute, useAuth } from 'features/auth';
// import { I18nMessage } from 'features/i18n';
import { useRouter } from 'next/router';
import { Reducer, useEffect, useReducer } from 'react';
import { ApiActionType } from './api-action.enum';
import ApiReducer from './api.reducer';
import client from './client.config';
import { IRequestState } from './api.interface';
import { useAuth } from '../auth';

interface ApiCallConfig {
  lazy?: boolean;
}

const defaultRequestState = {
  data: null,
  error: null,
  loading: false,
  loaded: false,
};

function useApi<
  ResponseType = Record<string, unknown>,
  RequestType = Record<string, unknown>,
  ErrorType = {
    statusCode?: number;
    statusMessage?: string;
    code?: number;
    // validationErrors?: {
    //   [key in keyof RequestType]: I18nMessage[];
    // };
    status?: number;
    // message?: I18nMessage;
  }
>({
  lazy,
  method = 'GET',
  data: requestData,
  headers: requestHeaders,
  ...rest
}: AxiosRequestConfig<RequestType> & ApiCallConfig) {
  const [state, dispatch] = useReducer<
    Reducer<
      IRequestState<ResponseType, ErrorType>,
      {
        action: ApiActionType;
        payload?: Partial<IRequestState<ResponseType, ErrorType>>;
      }
    >
  >(ApiReducer<ResponseType, ErrorType>, defaultRequestState);
  const { token, logout } = useAuth();
  const { push, asPath, pathname, isReady } = useRouter();

  const callApi = async (data?: RequestType) => {
    dispatch({ action: ApiActionType.SET_LOADING, payload: { loading: true } });
    try {
      const res = await client.request({
        data,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...requestHeaders,
        },
        method,
        ...rest,
      });
      dispatch({
        action: ApiActionType.SET_DATA_LOADED,
        payload: { data: res.data as ResponseType },
      });
    } catch (err) {
      dispatch({
        action: ApiActionType.SET_ERROR,
        payload: { error: (err as AxiosError).response?.data as ErrorType },
      });
    } finally {
      dispatch({
        action: ApiActionType.SET_LOADING,
        payload: { loading: false },
      });
    }
  };

  // call GET request immediately if not lazy
  useEffect(() => {
    if (lazy || state.loading || state.loaded) {
      return;
    }
    if (method === 'GET' && !state.loaded && isReady) {
      callApi(requestData);
    }
  }, [state.loading, state.loaded, isReady]);

  // call logout if api call failed
  // useEffect(() => {
  //   if (state.error && (state.error as any).statusCode === 401) {
  //     push(`${LogoutRoute}?next=${asPath}`);
  //   }
  // }, [state.error]);

  // For manualy resetting the state
  const reset = () => {
    dispatch({
      action: ApiActionType.RESET,
      payload: defaultRequestState,
    });
  };

  return { ...state, callApi, reset };
}

export default useApi;

import { Reducer } from 'react';

import { AuthActionType } from './auth-action.enum';
import { saveAuthToken, saveBackupAuthToken } from './auth.utils';

export type AuthReducerStateType = {
  token?: string;
  backupToken?: string;
  loaded?: boolean;
};

export type AuthReducerActionType = {
  action: AuthActionType;
  payload?: AuthReducerStateType;
};

const AuthReducer: Reducer<AuthReducerStateType, AuthReducerActionType> = (
  state,
  action
) => {
  switch (action.action) {
    case AuthActionType.UPDATE_TOKEN: {
      saveAuthToken(action.payload?.token);
      return { ...state, token: action.payload?.token };
    }
    case AuthActionType.SET_TOKEN_LOADED: {
      saveAuthToken(action.payload?.token);
      saveBackupAuthToken(action.payload?.backupToken);
      return {
        ...state,
        token: action.payload?.token,
        backupToken: action.payload?.backupToken,
        loaded: action.payload?.loaded,
      };
    }

    case AuthActionType.LOGOUT: {
      saveAuthToken('');
      saveBackupAuthToken('');
      return {
        ...state,
        token: '',
      };
    }

    case AuthActionType.MASK_TOKEN: {
      const { token, ...rest } = state;
      saveBackupAuthToken(token);
      saveAuthToken(action.payload?.token);
      return {
        ...rest,
        token: action.payload?.token,
        backupToken: token,
      };
    }

    case AuthActionType.REMOVE_MASKED_TOKEN: {
      const { backupToken, token: _, ...rest } = state;
      saveAuthToken(backupToken);
      saveBackupAuthToken('');
      return {
        ...rest,
        token: backupToken,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;

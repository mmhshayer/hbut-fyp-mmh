import { useContext } from 'react';
import AuthContext from './auth.context';
import { AuthActionType } from './auth.enum';

export default function useAuth() {
  const { dispatch, ...rest } = useContext(AuthContext);

  const login = (token: string) => {
    if (dispatch) {
      dispatch({ action: AuthActionType.UPDATE_TOKEN, payload: { token } });
    }
    console.log('login', token);
  };

  const logout = () => {
    if (dispatch) {
      dispatch({ action: AuthActionType.LOGOUT });
    }
  };

  const maskToken = (token: string) => {
    if (dispatch) {
      dispatch({ action: AuthActionType.MASK_TOKEN, payload: { token } });
    }
  };

  const removeMaskedToken = () => {
    if (dispatch) {
      dispatch({ action: AuthActionType.REMOVE_MASKED_TOKEN });
    }
  };

  return {
    ...rest,
    login,
    logout,
    maskToken,
    removeMaskedToken,
  };
}

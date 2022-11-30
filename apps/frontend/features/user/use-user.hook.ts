import { useContext } from 'react';
import Company from './company.interface';
import UserContext from './user.context';
import { UserActionType } from './user.enum';
import { User } from './user.interface';

export default function useUser() {
  const { dispatch, ...rest } = useContext(UserContext);

  const setUser = (user?: User) => {
    if (dispatch) {
      dispatch({ action: UserActionType.SET_USER, payload: { user: user } });
    }
  };

  const setCurrentCompany = (company?: Company) => {
    if (dispatch) {
      dispatch({
        action: UserActionType.SET_CURRENT_COMPANY,
        payload: { currentCompany: company },
      });
    }
  };

  const addCompany = (company: Company) => {
    if (dispatch) {
      dispatch({ action: UserActionType.ADD_COMPANY, payload: { company } });
    }
  };

  const destroySession = () => {
    if (dispatch) {
      dispatch({ action: UserActionType.DESTROY_SESSION });
    }
  };

  return {
    ...rest,
    setUser,
    setCurrentCompany,
    addCompany,
    destroySession,
  };
}

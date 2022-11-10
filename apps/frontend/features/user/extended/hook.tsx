import { useContext } from 'react';
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

  // const setCurrentCompany = (company?: Company) => {
  //   if (dispatch) {
  //     dispatch({
  //       action: UserActionType.SET_CURRENT_COMPANY,
  //       payload: { currentCompany: company },
  //     });
  //   }
  // };

  const destroySession = () => {
    if (dispatch) {
      dispatch({ action: UserActionType.DESTROY_SESSION });
    }
  };

  // const addCompany = (company: Company) => {
  //   if (dispatch) {
  //     dispatch({ action: UserActionType.ADD_COMPANY, payload: { company } });
  //   }
  // };

  // const maskSession = (user: User, company: Company) => {
  //   if (dispatch) {
  //     dispatch({
  //       action: UserActionType.MASK_SESSION,
  //       payload: { user, currentCompany: company },
  //     });
  //   }
  // };

  // const removeMaskedSession = () => {
  //   if (dispatch) {
  //     dispatch({ action: UserActionType.REMOVE_MASKED_SESSION });
  //   }
  // };

  // const setShowCompanyInfoPopup = (hidden: boolean) => {
  //   if (dispatch) {
  //     dispatch({
  //       action: UserActionType.SHOW_COMPANY_INFO_POPUP,
  //       payload: { showCompanyInfoPopup: hidden },
  //     });
  //   }
  // };

  return {
    ...rest,
    setUser,
    // setCurrentCompany,
    destroySession,
    // addCompany,
    // maskSession,
    // removeMaskedSession,
    // setShowCompanyInfoPopup,
  };
}

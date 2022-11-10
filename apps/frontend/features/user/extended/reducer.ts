import { Reducer } from 'react';
import { UserActionType } from './user.enum';
import { UserReducerActionType, UserReducerStateType } from './user.interface';
import { saveCurrentCompanyId } from './extended/user.utils';

const UserReducer: Reducer<UserReducerStateType, UserReducerActionType> = (
  state,
  action
) => {
  switch (action.action) {
    case UserActionType.SET_USER: {
      return {
        ...state,
        user: action.payload?.user,
      };
    }
    // case UserActionType.SET_CURRENT_COMPANY: {
    //   if (action.payload?.currentCompany) {
    //     saveCurrentCompanyId(action.payload.currentCompany._id);
    //   }
    //   return {
    //     ...state,
    //     currentCompany: action.payload?.currentCompany,
    //   };
    // }
    case UserActionType.DESTROY_SESSION: {
      saveCurrentCompanyId('');
      return {};
    }
    // case UserActionType.ADD_COMPANY: {
    //   const { companies = [] } = state;
    //   let newCompanies = [...companies];
    //   if (action.payload?.company) {
    //     newCompanies = [...newCompanies, action.payload.company];
    //   }
    //   return {
    //     ...state,
    //     companies: newCompanies,
    //   };
    // }
    // case UserActionType.MASK_SESSION: {
    //   const { user, companies: _, ...rest } = state;
    //   const currentCompany = action.payload?.currentCompany;
    //   if (!currentCompany) {
    //     return state;
    //   }
    //   saveCurrentCompanyId(currentCompany._id);
    //   return {
    //     ...rest,
    //     user: action.payload?.user,
    //     currentCompany: currentCompany,
    //     companies: [currentCompany],
    //   };
    // }
    // case UserActionType.REMOVE_MASKED_SESSION: {
    //   const { currentCompany: _, user: __, companies: ___, ...rest } = state;
    //   saveCurrentCompanyId('');
    //   return {
    //     ...rest,
    //   };
    // }
    // case UserActionType.SHOW_COMPANY_INFO_POPUP: {
    //   return {
    //     ...state,
    //     showCompanyInfoPopup: action.payload?.showCompanyInfoPopup || false,
    //   };
    // }
    default:
      return state;
  }
};

export default UserReducer;

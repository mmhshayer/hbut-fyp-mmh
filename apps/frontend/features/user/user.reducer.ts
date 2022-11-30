import { Reducer } from 'react';
import { UserActionType } from './user.enum';
import { UserReducerActionType, UserReducerStateType } from './user.interface';
import { saveCurrentCompanyId } from './extended/user.utils';

const UserReducer: Reducer<UserReducerStateType, UserReducerActionType> = (
  state,
  action
) => {
  switch (action.action) {
    case UserActionType.SET_USER_COMPANY_DATA: {
      if (action.payload?.currentCompany) {
        saveCurrentCompanyId(action.payload.currentCompany._id);
      }
      return {
        ...state,
        ...action.payload,
      };
    }

    case UserActionType.SET_USER: {
      return {
        ...state,
        user: action.payload?.user,
      };
    }

    case UserActionType.SET_CURRENT_COMPANY: {
      if (action.payload?.currentCompany) {
        saveCurrentCompanyId(action.payload.currentCompany._id);
      }
      return {
        ...state,
        currentCompany: action.payload?.currentCompany,
      };
    }

    case UserActionType.ADD_COMPANY: {
      const { companies = [] } = state;
      let newCompanies = [...companies];
      if (action.payload?.company) {
        newCompanies = [...newCompanies, action.payload.company];
      }
      return {
        ...state,
        companies: newCompanies,
      };
    }

    case UserActionType.DESTROY_SESSION: {
      saveCurrentCompanyId('');
      return {};
    }
    default:
      return state;
  }
};

export default UserReducer;

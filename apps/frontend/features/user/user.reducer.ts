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
    case UserActionType.DESTROY_SESSION: {
      saveCurrentCompanyId('');
      return {};
    }
    default:
      return state;
  }
};

export default UserReducer;

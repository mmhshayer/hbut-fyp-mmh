import { createContext, Dispatch } from 'react';
import { UserReducerActionType, UserReducerStateType } from './user.interface';

type UserContextType = UserReducerStateType & {
  dispatch?: Dispatch<UserReducerActionType>;
};

const UserContext = createContext<UserContextType>({});

export default UserContext;

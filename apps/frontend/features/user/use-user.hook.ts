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

  const destroySession = () => {
    if (dispatch) {
      dispatch({ action: UserActionType.DESTROY_SESSION });
    }
  };

  return {
    ...rest,
    setUser,
    destroySession,
  };
}

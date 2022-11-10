export interface User {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface UserReducerStateType {
  user?: User;
}

export interface UserReducerActionType {
  action: string;
  payload?: UserReducerStateType;
}

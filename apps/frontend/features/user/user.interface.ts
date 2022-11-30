import Company from './company.interface';

export interface User {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface UserReducerStateType {
  user?: User;
  companies?: Company[];
  currentCompany?: Company;
}

export interface UserReducerActionType {
  action: string;
  payload?: UserReducerStateType & { company?: Company };
}

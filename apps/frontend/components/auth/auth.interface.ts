export interface ILogin {
  email: string;
  password: string;
}

export type IForforPassword = Omit<ILogin, 'password'>;

export interface LoginResponse {
  access_token: string;
}

export interface IRegister extends ILogin {
  name: string;
  passwordConfirmation?: string;
}

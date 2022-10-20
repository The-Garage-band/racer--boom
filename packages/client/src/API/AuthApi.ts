import { PATH_LOGIN, PATH_LOGOUT, PATH_SIGNUP } from '../constants';
import { AxiosInstance } from './AxiosInstance';

interface ILogIn {
  login: string;
  password: string;
}

interface ISignUp {
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface IUser extends Omit<ISignUp, 'password'> {
  id: number;
  // eslint-disable-next-line camelcase
  display_name: string;
  avatar: string;
}

const login = <T>(data: T) => AxiosInstance.post<string>(PATH_LOGIN, data);

const logout = () => AxiosInstance.post(PATH_LOGOUT);

const signup = <T>(data: T) => AxiosInstance.post<Record<string, number>>(PATH_SIGNUP, data);

export { login, logout, signup };
export type { ILogIn, ISignUp, IUser };

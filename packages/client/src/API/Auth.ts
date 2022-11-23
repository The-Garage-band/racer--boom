import { PATH_LOGIN, PATH_LOGOUT, PATH_SIGNUP, PATH_GET_SERVICE_ID, PATH_LOGIN_YANDEX } from '../constants'
import { AxiosInstance } from './AxiosInstance'

interface ILogIn {
  login: string
  password: string
}

interface ISignUp {
  // eslint-disable-next-line camelcase
  first_name: string
  // eslint-disable-next-line camelcase
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface IUser extends Omit<ISignUp, 'password'> {
  id: number
  // eslint-disable-next-line camelcase
  display_name: string
  avatar: string
}

const login = <T>(data: T) => AxiosInstance.post<string>(PATH_LOGIN, data)

const logout = () => AxiosInstance.post(PATH_LOGOUT)

const signup = <T>(data: T) =>
  AxiosInstance.post<Record<string, number>>(PATH_SIGNUP, data)

const OAuthGetServiceId = () => {
  const REDIRECT_URI = `${window.location.protocol}//${window.location.host}`;
  const getUrl = `${PATH_GET_SERVICE_ID}?redirect_uri=${REDIRECT_URI}`;
  return AxiosInstance.get(getUrl);
};
const OAuthLogin = <T>(data: T) => AxiosInstance.post(PATH_LOGIN_YANDEX, data);

export { login, logout, signup, OAuthLogin, OAuthGetServiceId }
export type { ILogIn, ISignUp, IUser }

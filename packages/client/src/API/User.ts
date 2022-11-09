import { PATH_GET_USER, PATH_UPDATE_PROFILE, PATH_AVATAR } from '../constants'
import { AxiosInstance, AxiosInstanceFile } from './AxiosInstance'

type TAvatar = {
  name: string
  size: number
  type: string
  lastModified: number
  webkitRelativePath: string
}

interface IProfile {
  // eslint-disable-next-line camelcase
  first_name: string
  // eslint-disable-next-line camelcase
  second_name: string
  // eslint-disable-next-line camelcase
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

const getUser = () => AxiosInstance.get(PATH_GET_USER)

const updateProfile = <T>(data: T) =>
  AxiosInstance.put<string>(PATH_UPDATE_PROFILE, data)

const updateAvatar = <T>(data: T) =>
AxiosInstanceFile.put<string>(PATH_AVATAR, data)

export { getUser, updateProfile, updateAvatar }
export type { IProfile, TAvatar }

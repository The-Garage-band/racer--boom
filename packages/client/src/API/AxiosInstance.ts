import axios from 'axios';
import { URL_API } from '../constants';

export const AxiosInstance = axios.create({
  baseURL: URL_API,
  headers: {
      'content-type': 'application/json',
  },
  withCredentials: true,
});

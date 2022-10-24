import axios from 'axios';
import { URL_API } from '../constants';

export const AxiosInstance = axios?.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

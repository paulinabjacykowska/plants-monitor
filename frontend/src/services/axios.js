import { BACKEND_IP } from '../constants';
import axiosBase from 'axios';

export const axios = axiosBase.create({
  baseURL: BACKEND_IP,
  timeout: 5000,
});

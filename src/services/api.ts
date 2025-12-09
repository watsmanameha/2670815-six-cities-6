import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_KEY = 'six-cities-token';
const STATUS_CODE_UNAUTHORIZED = 401;

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === STATUS_CODE_UNAUTHORIZED) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

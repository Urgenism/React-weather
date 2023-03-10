import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { settings } from 'global/settings';

// Default API will be your root
const API_ROOT = settings.API_URL || '';
const TIMEOUT = settings.API_TIMEOUT || 30000;

/**
 * API call utility function
 *
 * @param {string} baseURL
 * @param {number} timeout
 * @returns
 */

const http = (baseURL: string = API_ROOT, timeout: number = TIMEOUT) => {
  const client: AxiosInstance = axios.create({
    baseURL,
    timeout,
  });

  // Intercept response object and handleSuccess and Error Object
  client.interceptors.response.use(handleSuccess, handleError);

  function handleSuccess(response: AxiosResponse) {
    return response;
  }

  /** Intercept any unauthorized request.**/
  function handleError(error: AxiosError) {
    return Promise.reject(error?.response?.data);
  }

  function get(path: string, config?: AxiosRequestConfig) {
    return client.get(path, config).then(response => response.data);
  }

  function post(path: string, payload: any, config?: AxiosRequestConfig) {
    return client.post(path, payload, config).then(response => response.data);
  }

  function put(path: string, payload: any, config?: AxiosRequestConfig) {
    return client.put(path, payload, config).then(response => response.data);
  }

  function patch(path: string, payload: any, config?: AxiosRequestConfig) {
    return client.patch(path, payload, config).then(response => response.data);
  }

  function _delete(path: string, data?: any, config?: AxiosRequestConfig) {
    if (data) {
      return client.delete(path, { data: data }).then(response => response.data);
    }
    return client.delete(path, config).then(response => response.data);
  }

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

export default http;

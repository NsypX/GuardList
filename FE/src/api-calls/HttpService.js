import axios from 'axios';

const ERROR_MESSAGE = {
  TIMEOUT:
    'Oops! The request has timed out. Please check your internet connection and try again. ' +
    'If the problem persists, please contact support.',
  NETWORK:
    'Oops! There was a problem with the network connection. Please check your internet connection and try again.' +
    'If the problem persists, please contact support.',
  FORBIDDEN:
    'Oops! Access Denied: You do not have permission to access this resource. Please contact an administrator ' +
    'if you believe this is an error.',
};

/**
 * Base HTTP service to make HTTP requests using Axios.
 */
export class HttpService {
  /**
   * Creates an instance of the HTTP service.
   * @param {string} serviceBaseUrl - The base URL of the service to make requests to.
   */
  constructor(serviceBaseUrl) {
    /**
     * The Axios instance used to make HTTP requests.
     * @type {import('axios').AxiosInstance}
     */
    this.axios = axios.create({
      baseURL: serviceBaseUrl,
    });

    /**
     * The base URL of the service to make requests to.
     * @type {string}
     */
    this.baseUrl = serviceBaseUrl;

    this.axios.defaults.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    this.initializeResponseInterceptor();
  }

  /**
   * Sends an HTTP GET request to the specified URL with the specified configuration.
   * @param {string} url - The URL to make the request to.
   * @param {import('axios').AxiosRequestConfig} [config] - The Axios request configuration.
   * @returns {Promise} - Promise that resolves with the response data or rejects with an error.
   */
  get(url, config) {
    return this.axios.get(url, config);
  }

  /**
   * Sends an HTTP POST request to the specified URL with the specified data and configuration.
   * @param {string} url - The URL to make the request to.
   * @param {*} data - The data to send with the request.
   * @param {import('axios').AxiosRequestConfig} [config] - The Axios request configuration.
   * @returns {Promise} - Promise that resolves with the response data or rejects with an error.
   */
  post(url, data, config) {
    return this.axios.post(url, data, config);
  }

  /**
   * Sends an HTTP PUT request to the specified URL with the specified data and configuration.
   * @param {string} url - The URL to make the request to.
   * @param {*} data - The data to send with the request.
   * @param {import('axios').AxiosRequestConfig} [config] - The Axios request configuration.
   * @returns {Promise} - Promise that resolves with the response data or rejects with an error.
   */
  put(url, data, config) {
    return this.axios.put(url, data, config);
  }

  /**
   * Sends an HTTP DELETE request to the specified URL with the specified configuration.
   * @param {string} url - The URL to make the request to.
   * @param {import('axios').AxiosRequestConfig} [config] - The Axios request configuration.
   * @returns {Promise}  Promise that resolves with the response data or rejects with an error.
   */
  delete(url, config) {
    return this.axios.delete(url, config);
  }

  /**
   * Initializes the response interceptor to handle responses and errors.
   */
  initializeResponseInterceptor = () => {
    this.axios.interceptors.response.use(this.handleResponse, this.handleError);
  };
 
  /**
   * Handles the response interceptor to handle successful responses.
   * @param {object} response - The Axios response object.
   *  @returns {*} - The response data.
   */
  handleResponse = ({ data }) => data;

  /**
   * Handles the response interceptor to handle errors.
   * @param {object} error - The Axios error object.
   * @returns {Promise} - A promise that rejects with an error.
   */
  handleError = (error) => {
    // Handle server-side errors
    if (error.response?.data) {
      if (error.response.status === 403) {
        return Promise.reject(new Error(ERROR_MESSAGE.FORBIDDEN));
      }

      return Promise.reject(error.response.data);
    }

    // Handle client-side errors
    if (error.request) {
      // handle request timeout error
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error(ERROR_MESSAGE.TIMEOUT));
      }

      if (error.code === 'ETIMEDOUT') {
        return Promise.reject(new Error(ERROR_MESSAGE.TIMEOUT));
      }
      // handle other network issues
      return Promise.reject(new Error(ERROR_MESSAGE.NETWORK));
    }

    return Promise.reject(error.message);
  };
}

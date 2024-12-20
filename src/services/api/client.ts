import axios from 'axios';
import { TICKETMASTER_CONFIG } from '../../config/api';
import { withRetry } from './retryStrategy';
import { ApiError, isRetryableError } from './errorHandling';

const client = axios.create({
  baseURL: TICKETMASTER_CONFIG.BASE_URL,
  timeout: 10000,
  params: {
    apikey: TICKETMASTER_CONFIG.API_KEY
  }
});

client.interceptors.response.use(
  response => response.data,
  error => {
    const apiError = ApiError.fromError(error);
    apiError.isRetryable = isRetryableError(error);
    return Promise.reject(apiError);
  }
);

export const apiClient = {
  async get<T>(endpoint: string, params = {}) {
    return withRetry(() => 
      client.get<T>(endpoint, { params })
    );
  },

  async post<T>(endpoint: string, data = {}, params = {}) {
    return withRetry(() => 
      client.post<T>(endpoint, data, { params })
    );
  }
};
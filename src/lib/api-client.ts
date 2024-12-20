import axios from 'axios';
import { TICKETMASTER_CONFIG } from '../config/api';
import { apiCache } from './cache';

const api = axios.create({
  baseURL: TICKETMASTER_CONFIG.BASE_URL,
  params: {
    apikey: TICKETMASTER_CONFIG.API_KEY
  }
});

// Rate limiting
let requestCount = 0;
let lastRequestTime = Date.now();

const rateLimiter = async () => {
  const now = Date.now();
  const timeDiff = now - lastRequestTime;
  
  if (timeDiff >= 1000) {
    requestCount = 0;
    lastRequestTime = now;
  }
  
  if (requestCount >= TICKETMASTER_CONFIG.RATE_LIMIT) {
    const delay = 1000 - timeDiff;
    await new Promise(resolve => setTimeout(resolve, delay));
    requestCount = 0;
    lastRequestTime = Date.now();
  }
  
  requestCount++;
};

export const apiClient = {
  async get<T>(endpoint: string, params = {}) {
    const cacheKey = `${endpoint}?${new URLSearchParams(params as any).toString()}`;
    const cachedData = apiCache.get<T>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    await rateLimiter();
    
    try {
      const response = await api.get<T>(endpoint, { params });
      apiCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          // Rate limit exceeded, retry after delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          return this.get<T>(endpoint, params);
        }
        throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
};
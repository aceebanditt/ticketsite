import { TICKETMASTER_CONFIG } from '../config/api';

export function buildTicketmasterUrl(endpoint: string, params: Record<string, any> = {}): string {
  const url = new URL(`${TICKETMASTER_CONFIG.BASE_URL}${endpoint}`);
  
  // Add API key
  url.searchParams.append('apikey', TICKETMASTER_CONFIG.API_KEY);
  
  // Add default params
  Object.entries(TICKETMASTER_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}

export function parseTicketmasterUrl(url: string): {
  endpoint: string;
  params: Record<string, string>;
} {
  const parsedUrl = new URL(url);
  const endpoint = parsedUrl.pathname.replace(TICKETMASTER_CONFIG.BASE_URL, '');
  
  const params: Record<string, string> = {};
  parsedUrl.searchParams.forEach((value, key) => {
    if (key !== 'apikey') { // Don't include API key in parsed params
      params[key] = value;
    }
  });
  
  return { endpoint, params };
}
import axios from 'axios';
import { TICKETMASTER_CONFIG } from '../../../config/api';
import { TicketmasterApiError } from './errors';

const client = axios.create({
  baseURL: TICKETMASTER_CONFIG.BASE_URL,
  params: {
    apikey: TICKETMASTER_CONFIG.API_KEY
  }
});

// Add response interceptor for error handling
client.interceptors.response.use(
  response => response.data,
  error => {
    throw TicketmasterApiError.fromResponse(error);
  }
);

export { client as ticketmasterClient };
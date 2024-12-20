import { buildTicketmasterUrl } from '../../../utils/url';
import { ticketmasterClient } from './client';
import { TicketmasterParams } from './types';

export async function makeTicketmasterRequest<T>(
  endpoint: string,
  params: TicketmasterParams = {}
): Promise<T> {
  const url = buildTicketmasterUrl(endpoint, params);
  console.debug('Ticketmaster API Request:', url);
  
  try {
    const response = await ticketmasterClient.get(url);
    return response as T;
  } catch (error) {
    console.error('Ticketmaster API Error:', error);
    throw error;
  }
}
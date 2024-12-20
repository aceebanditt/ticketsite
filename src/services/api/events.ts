import { apiClient } from './client';
import { transformEventData } from '../transforms/eventTransform';
import { TICKETMASTER_CONFIG } from '../../config/api';

interface EventSearchParams {
  keyword?: string;
  classificationId?: string;
  startDateTime?: string;
  endDateTime?: string;
  city?: string;
  sort?: string;
  page?: number;
  size?: number;
}

export const eventService = {
  async getEvents(params: EventSearchParams = {}) {
    try {
      const response = await apiClient.get('/events', { 
        params: {
          ...params,
          size: params.size || TICKETMASTER_CONFIG.PAGE_SIZE,
          startDateTime: params.startDateTime || new Date().toISOString()
        }
      });

      // Handle empty response
      if (!response?._embedded?.events) {
        return {
          events: [],
          page: { 
            number: 0, 
            totalPages: 0, 
            size: TICKETMASTER_CONFIG.PAGE_SIZE 
          }
        };
      }

      // Transform and validate events
      const events = response._embedded.events
        .map(transformEventData)
        .filter(event => event.id && event.name);

      return {
        events,
        page: response.page || { 
          number: 0, 
          totalPages: 0, 
          size: TICKETMASTER_CONFIG.PAGE_SIZE 
        }
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Failed to fetch events');
    }
  }
};
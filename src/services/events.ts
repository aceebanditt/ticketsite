import { apiClient } from '../lib/api-client';
import { EVENT_CATEGORIES, TICKETMASTER_CONFIG } from '../config/api';

export interface EventSearchParams {
  keyword?: string;
  classificationId?: string;
  startDateTime?: string;
  endDateTime?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  radius?: string;
  sort?: string;
  page?: number;
}

export const eventService = {
  async searchEvents(params: EventSearchParams = {}) {
    const response = await apiClient.get('/events', {
      ...params,
      size: TICKETMASTER_CONFIG.PAGE_SIZE,
      includeTBA: 'yes',
      includeTBD: 'yes',
      includeTest: 'yes'
    });

    return response._embedded?.events || [];
  },

  async getUpcomingEvents() {
    const startDateTime = new Date().toISOString();
    const endDateTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    return this.searchEvents({
      startDateTime,
      endDateTime,
      sort: 'date,asc'
    });
  },

  async getTrendingEvents() {
    return this.searchEvents({
      sort: 'relevance,desc'
    });
  },

  async getEventsByCategory(categoryId: string) {
    return this.searchEvents({
      classificationId: categoryId
    });
  },

  async getEventDetails(eventId: string) {
    return apiClient.get(`/events/${eventId}`);
  }
};
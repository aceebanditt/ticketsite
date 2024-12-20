import { apiClient } from './client';
import { transformVenueData } from '../transforms/venueTransform';

export const venueService = {
  async search(params = {}) {
    try {
      const response = await apiClient.get('/venues', { params });
      return {
        venues: (response._embedded?.venues || []).map(transformVenueData),
        page: response.page,
        links: response._links
      };
    } catch (error) {
      console.error('Error searching venues:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const response = await apiClient.get(`/venues/${id}`);
      return transformVenueData(response);
    } catch (error) {
      console.error('Error fetching venue:', error);
      throw error;
    }
  },

  async getUpcomingEvents(id: string) {
    try {
      const response = await apiClient.get('/events', {
        params: {
          venueId: id,
          sort: 'date,asc'
        }
      });
      return response._embedded?.events || [];
    } catch (error) {
      console.error('Error fetching venue events:', error);
      throw error;
    }
  }
};
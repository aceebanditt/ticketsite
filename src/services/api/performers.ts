import { apiClient } from './client';
import { transformPerformerData } from '../transforms/performerTransform';

export const performerService = {
  async search(params = {}) {
    try {
      const response = await apiClient.get('/attractions', { params });
      return {
        performers: (response._embedded?.attractions || []).map(transformPerformerData),
        page: response.page,
        links: response._links
      };
    } catch (error) {
      console.error('Error searching performers:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const response = await apiClient.get(`/attractions/${id}`);
      return transformPerformerData(response);
    } catch (error) {
      console.error('Error fetching performer:', error);
      throw error;
    }
  },

  async getUpcoming(id: string) {
    try {
      const response = await apiClient.get('/events', {
        params: {
          attractionId: id,
          sort: 'date,asc'
        }
      });
      return response._embedded?.events || [];
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  }
};
import axios from 'axios';
import { config } from '../config/env';

const api = axios.create({
  baseURL: config.apiBaseUrl
});

export const eventService = {
  async fetchEvents(params = {}) {
    try {
      const response = await api.get('/events.json', {
        params: {
          apikey: config.apiKey,
          ...params
        }
      });
      return response.data._embedded?.events || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async fetchEventDetails(eventId: string) {
    try {
      const response = await api.get(`/events/${eventId}`, {
        params: { apikey: config.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  }
};

export const venueService = {
  async fetchVenueSeating(venueId: string) {
    try {
      const response = await api.get(`/venues/${venueId}/seatingChart`, {
        params: { apikey: config.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching seating chart:', error);
      throw error;
    }
  }
};
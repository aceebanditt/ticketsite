import axios from 'axios';
import { TICKETMASTER_CONFIG } from '../config/api';
import { TicketmasterEvent } from '../types/api';

const api = axios.create({
  baseURL: TICKETMASTER_CONFIG.BASE_URL,
  params: {
    apikey: TICKETMASTER_CONFIG.API_KEY
  }
});

// Safely transform API response data without cloning issues
const transformEventData = (data: any): Partial<TicketmasterEvent> => ({
  id: data.id,
  name: data.name,
  dates: {
    start: {
      dateTime: data.dates?.start?.dateTime,
      localDate: data.dates?.start?.localDate,
      localTime: data.dates?.start?.localTime
    },
    status: {
      code: data.dates?.status?.code
    }
  },
  images: data.images?.map((img: any) => ({
    url: img.url,
    ratio: img.ratio,
    width: img.width,
    height: img.height
  })),
  priceRanges: data.priceRanges?.map((price: any) => ({
    type: price.type,
    currency: price.currency,
    min: price.min,
    max: price.max
  })),
  _embedded: data._embedded ? {
    venues: data._embedded.venues?.map((venue: any) => ({
      id: venue.id,
      name: venue.name,
      city: venue.city ? { name: venue.city.name } : undefined,
      state: venue.state ? { stateCode: venue.state.stateCode } : undefined,
      address: venue.address ? { line1: venue.address.line1 } : undefined
    }))
  } : undefined,
  info: data.info,
  pleaseNote: data.pleaseNote
});

export const ticketmasterApi = {
  async getEvents(params = {}) {
    try {
      const response = await api.get('/events', { params });
      const events = response.data._embedded?.events || [];
      return events.map(transformEventData);
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async getEventDetails(id: string) {
    try {
      const response = await api.get(`/events/${id}`);
      return transformEventData(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      return null;
    }
  },

  async getEventSeats(id: string) {
    try {
      const response = await api.get(`/events/${id}`);
      return {
        sections: response.data?.seatmap?.sections || [],
        seatmap: response.data?.seatmap || null,
        availability: {}
      };
    } catch (error) {
      console.error('Error fetching event seats:', error);
      return { sections: [], seatmap: null, availability: {} };
    }
  },

  async getVenueSeating(id: string) {
    try {
      const response = await api.get(`/venues/${id}`);
      return {
        seatmap: response.data?.seatmap || null,
        name: response.data?.name,
        id: response.data?.id
      };
    } catch (error) {
      console.error('Error fetching venue seating:', error);
      return { seatmap: null, name: null, id };
    }
  }
};
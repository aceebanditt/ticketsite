import { makeTicketmasterRequest } from './request';
import { TicketmasterParams } from './types';
import { transformEventData } from '../../transforms/eventTransform';
import { TICKETMASTER_CONFIG } from '../../../config/api';

export const ticketmasterEvents = {
  async search(params: TicketmasterParams = {}) {
    const response = await makeTicketmasterRequest('/events', {
      ...params,
      size: params.size || TICKETMASTER_CONFIG.PAGE_SIZE
    });

    return {
      events: (response._embedded?.events || []).map(transformEventData),
      page: response.page,
      links: response._links
    };
  },

  async getById(id: string) {
    const response = await makeTicketmasterRequest(`/events/${id}`);
    return transformEventData(response);
  },

  async getByIds(ids: string[]) {
    const requests = ids.map(id => this.getById(id));
    const events = await Promise.all(requests);
    return events.filter(Boolean);
  }
};
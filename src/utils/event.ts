import { TicketmasterEvent } from '../types/api';

export function getEventImage(event: TicketmasterEvent, ratio: string = '16_9'): string {
  return event.images?.find(img => img.ratio === ratio)?.url || event.images?.[0]?.url || '';
}

export function getEventVenue(event: TicketmasterEvent) {
  return event._embedded?.venues?.[0];
}

export function getEventStatus(event: TicketmasterEvent): string {
  const status = event.dates.status.code;
  switch (status) {
    case 'onsale':
      return 'On Sale';
    case 'offsale':
      return 'Off Sale';
    case 'cancelled':
      return 'Cancelled';
    case 'postponed':
      return 'Postponed';
    case 'rescheduled':
      return 'Rescheduled';
    default:
      return status;
  }
}

export function getEventPriceRange(event: TicketmasterEvent) {
  return event.priceRanges?.[0];
}

export function formatVenueAddress(venue: TicketmasterEvent['_embedded']['venues'][0]) {
  if (!venue) return '';
  
  const parts = [
    venue.address?.line1,
    venue.city?.name,
    venue.state?.stateCode
  ].filter(Boolean);
  
  return parts.join(', ');
}
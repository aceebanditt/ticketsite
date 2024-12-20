import { useTicketmasterEvents } from './useTicketmasterEvents';

export function useFeaturedEvents() {
  const today = new Date().toISOString();
  
  return useTicketmasterEvents({
    startDateTime: today,
    sort: 'date,asc',
    size: 10
  });
}
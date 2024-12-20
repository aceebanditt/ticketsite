import { useState, useEffect } from 'react';
import { ticketmasterApi } from '../services/ticketmaster';

export function useRealTimeTickets(eventId: string, sectionId?: string) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const eventDetails = await ticketmasterApi.getEventDetails(eventId);
        
        // Transform ticket data from the API response
        const availableTickets = eventDetails.priceRanges?.map((price: any) => ({
          id: `${eventId}-${price.type}`,
          section: sectionId || 'General',
          price: price.min,
          type: price.type,
          currency: price.currency
        })) || [];

        setTickets(availableTickets);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load tickets'));
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [eventId, sectionId]);

  return { tickets, loading, error };
}
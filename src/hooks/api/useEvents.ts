import { useState, useCallback } from 'react';
import { ticketmasterEvents } from '../../services/api/ticketmaster/events';
import { TicketmasterParams } from '../../services/api/ticketmaster/types';
import { useTicketmasterRequest } from './useTicketmasterRequest';

export function useEvents(params: TicketmasterParams = {}) {
  const [page, setPage] = useState(0);
  
  const fetchEvents = useCallback(() => {
    return ticketmasterEvents.search({ ...params, page });
  }, [JSON.stringify(params), page]);

  const { data, loading, error } = useTicketmasterRequest(fetchEvents, [fetchEvents]);

  const hasMore = data?.page?.totalPages ? data.page.totalPages > page + 1 : false;

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return {
    events: data?.events || [],
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => setPage(0)
  };
}
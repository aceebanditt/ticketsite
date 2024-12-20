import { useState, useCallback } from 'react';
import { EventSearchParams } from '../services/events';
import { useEvents } from './useEvents';

export function useEventSearch() {
  const [filters, setFilters] = useState<EventSearchParams>({
    keyword: '',
    location: '',
    category: '',
    sort: 'date,asc'
  });

  const { events, loading, error, hasMore, loadMore } = useEvents(filters);

  const updateFilters = useCallback((newFilters: Partial<EventSearchParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    filters,
    events,
    loading,
    error,
    hasMore,
    loadMore,
    updateFilters
  };
}
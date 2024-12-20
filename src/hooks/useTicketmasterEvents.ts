import { useState, useEffect, useCallback, useRef } from 'react';
import { eventService } from '../services/api/events';

interface UseTicketmasterEventsParams {
  classificationId?: string;
  keyword?: string;
  startDateTime?: string;
  endDateTime?: string;
  city?: string;
  sort?: string;
  size?: number;
}

export function useTicketmasterEvents(params: UseTicketmasterEventsParams = {}) {
  const [state, setState] = useState({
    events: [],
    loading: true,
    error: null,
    hasMore: true,
    page: 0
  });

  const paramsRef = useRef(params);
  const mountedRef = useRef(true);

  // Update params ref when they change
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const fetchEvents = useCallback(async (pageNumber: number) => {
    if (!mountedRef.current) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await eventService.getEvents({
        ...paramsRef.current,
        page: pageNumber
      });

      if (!mountedRef.current) return;

      setState(prev => ({
        ...prev,
        events: pageNumber === 0 ? response.events : [...prev.events, ...response.events],
        loading: false,
        hasMore: response.page.number < response.page.totalPages - 1,
        page: pageNumber,
        error: null
      }));
    } catch (err) {
      if (!mountedRef.current) return;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch events')
      }));
    }
  }, []); // Empty dependency array since we use refs

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset and fetch when params change
  useEffect(() => {
    setState(prev => ({
      ...prev,
      events: [],
      loading: true,
      error: null,
      hasMore: true,
      page: 0
    }));
    
    fetchEvents(0);
  }, [fetchEvents, JSON.stringify(params)]); // Include stringified params to detect changes

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchEvents(state.page + 1);
    }
  }, [state.loading, state.hasMore, state.page, fetchEvents]);

  return {
    events: state.events,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    loadMore
  };
}
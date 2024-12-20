import { useState, useEffect } from 'react';
import { eventService, EventSearchParams } from '../services/events';

export function useEvents(params: EventSearchParams = {}) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await eventService.searchEvents({ ...params, page });
        
        if (page === 0) {
          setEvents(data);
        } else {
          setEvents(prev => [...prev, ...data]);
        }
        
        setHasMore(data.length === TICKETMASTER_CONFIG.PAGE_SIZE);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load events'));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [JSON.stringify(params), page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { events, loading, error, hasMore, loadMore };
}

export function useUpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load upcoming events'));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
}

export function useTrendingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getTrendingEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load trending events'));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
}
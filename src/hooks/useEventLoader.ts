import { useState, useCallback } from 'react';
import { eventService } from '../services/api/events';
import { useCache } from './useCache';
import { useRetry } from './useRetry';

interface EventLoaderState {
  loading: boolean;
  error: Error | null;
  retrying: boolean;
}

export function useEventLoader() {
  const [state, setState] = useState<EventLoaderState>({
    loading: false,
    error: null,
    retrying: false
  });
  
  const cache = useCache('events', 5 * 60 * 1000); // 5 minute cache
  const retry = useRetry();

  const loadEvents = useCallback(async (params: any) => {
    const cacheKey = JSON.stringify(params);
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await retry(
        () => eventService.getEvents(params),
        {
          maxAttempts: 3,
          initialDelay: 1000,
          onRetry: (attempt) => {
            setState(prev => ({ ...prev, retrying: true }));
            console.info(`Retrying event fetch (attempt ${attempt})`);
          }
        }
      );
      
      if (!data.events) {
        throw new Error('Invalid event data received');
      }
      
      cache.set(cacheKey, data);
      setState(prev => ({ ...prev, loading: false, retrying: false }));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load events';
      setState(prev => ({ 
        ...prev, 
        loading: false,
        retrying: false,
        error: new Error(errorMessage)
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    loadEvents
  };
}
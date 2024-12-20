import { useState, useEffect } from 'react';
import { TicketmasterApiError } from '../../services/api/ticketmaster/errors';

interface UseTicketmasterRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useTicketmasterRequest<T>(
  requestFn: () => Promise<T>,
  deps: any[] = []
): UseTicketmasterRequestState<T> {
  const [state, setState] = useState<UseTicketmasterRequestState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await requestFn();
        
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof TicketmasterApiError 
            ? err 
            : new Error('Failed to fetch data');
          
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error 
          }));
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}
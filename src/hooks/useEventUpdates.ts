import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { EventUpdate } from '../types/websocket';

export function useEventUpdates(eventId: string) {
  const [eventStatus, setEventStatus] = useState<EventUpdate['updates'] | null>(null);

  useEffect(() => {
    const unsubscribe = wsService.subscribe<EventUpdate>('EVENT_UPDATE', (data) => {
      if (data.eventId === eventId) {
        setEventStatus(prev => ({
          ...prev,
          ...data.updates
        }));
      }
    });

    // Start simulation and get cleanup function
    const cleanup = wsService.simulateUpdates(eventId);

    return () => {
      unsubscribe();
      cleanup?.();
    };
  }, [eventId]);

  return eventStatus;
}
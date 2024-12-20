import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { TicketUpdate } from '../types/websocket';

export function useTicketUpdates(eventId: string, sectionId?: string) {
  const [ticketUpdates, setTicketUpdates] = useState<Record<string, TicketUpdate['updates']>>({});

  useEffect(() => {
    const unsubscribe = wsService.subscribe<TicketUpdate>('TICKET_UPDATE', (data) => {
      if (data.eventId === eventId && (!sectionId || data.sectionId === sectionId)) {
        setTicketUpdates(prev => ({
          ...prev,
          [data.sectionId]: data.updates
        }));
      }
    });

    // Start simulation and get cleanup function
    const cleanup = wsService.simulateUpdates(eventId, sectionId);

    return () => {
      unsubscribe();
      cleanup?.();
    };
  }, [eventId, sectionId]);

  return ticketUpdates;
}
import { useState, useEffect } from 'react';
import { ticketmasterApi } from '../services/ticketmaster';

interface SeatingData {
  staticUrl?: string;
  sections: Array<{
    id: string;
    name: string;
  }>;
}

export function useSeatingData(venueId: string, eventId: string) {
  const [seatingData, setSeatingData] = useState<SeatingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSeatingData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load venue seating chart first
        const venueData = await ticketmasterApi.getVenueSeating(venueId);
        if (!mounted) return;

        // Then load event-specific seating data
        const eventData = await ticketmasterApi.getEventSeats(eventId);
        if (!mounted) return;

        // Create a safe, serializable object
        const sanitizedData: SeatingData = {
          staticUrl: venueData?.seatmap?.staticUrl,
          sections: (eventData?.sections || []).map(section => ({
            id: section.id,
            name: section.name
          }))
        };

        setSeatingData(sanitizedData);
      } catch (err) {
        if (mounted) {
          setError('Failed to load seating chart');
          console.error('Seating chart error:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (venueId && eventId) {
      loadSeatingData();
    }

    return () => {
      mounted = false;
    };
  }, [venueId, eventId]);

  return { seatingData, loading, error };
}
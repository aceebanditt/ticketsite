import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { eventService } from '../services/events';
import Container from '../components/layout/Container';
import EventDetails from '../components/events/EventDetails';
import TrendingEvents from '../components/events/TrendingEvents';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEventDetails(id!);
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load event details'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEventDetails();
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <Container>
      <div className="py-8">
        <EventDetails event={event} />
        
        <div className="mt-12">
          <TrendingEvents />
        </div>
      </div>
    </Container>
  );
}
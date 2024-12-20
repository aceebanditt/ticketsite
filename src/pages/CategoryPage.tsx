import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { eventService } from '../services/api';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await eventService.fetchEvents({ classificationId: categoryId });
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load events'));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [categoryId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Container>
      <Section title={`${categoryId} Events`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
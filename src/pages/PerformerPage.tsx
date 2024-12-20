import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ticketmasterApi } from '../services/ticketmaster';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function PerformerPage() {
  const { performerId } = useParams();
  const [performer, setPerformer] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerformerDetails = async () => {
      try {
        setLoading(true);
        const performerData = await ticketmasterApi.getPerformerDetails(performerId!);
        const eventsData = await ticketmasterApi.getEvents({ performerId });
        setPerformer(performerData);
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to load performer details');
      } finally {
        setLoading(false);
      }
    };

    if (performerId) {
      loadPerformerDetails();
    }
  }, [performerId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!performer) return <ErrorMessage message="Performer not found" />;

  return (
    <Container>
      <Section title={performer.name}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
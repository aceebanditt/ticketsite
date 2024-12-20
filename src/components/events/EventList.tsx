import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import EventCard from './EventCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface EventListProps {
  params?: Record<string, any>;
  className?: string;
}

export default function EventList({ params = {}, className = '' }: EventListProps) {
  const { events, loading, error } = useTicketmasterEvents(params);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
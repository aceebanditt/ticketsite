import { useEvents } from '../../../hooks/api/useEvents';
import EventGrid from '../EventGrid';
import ErrorMessage from '../../common/ErrorMessage';
import { TicketmasterParams } from '../../../services/api/ticketmaster/types';

interface EventListProps {
  params?: TicketmasterParams;
  className?: string;
}

export default function EventList({ params = {}, className = '' }: EventListProps) {
  const { events, loading, error, hasMore, loadMore } = useEvents(params);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className={className}>
      <EventGrid
        events={events}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
}
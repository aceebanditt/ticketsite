import { memo } from 'react';
import EventCard from './EventCard';
import InfiniteScroll from '../common/InfiniteScroll';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import { TicketmasterEvent } from '../../types/api';

interface EventGridProps {
  events: TicketmasterEvent[];
  loading: boolean;
  error: Error | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const EventGrid = memo(function EventGrid({ 
  events, 
  loading, 
  error, 
  hasMore, 
  onLoadMore 
}: EventGridProps) {
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  if (!loading && events.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No events found</p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      loading={loading}
      hasMore={hasMore || false}
      onLoadMore={onLoadMore || (() => {})}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      )}
    </InfiniteScroll>
  );
});

export default EventGrid;
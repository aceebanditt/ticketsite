import { useState } from 'react';
import { useTicketmasterEvents } from '../hooks/useTicketmasterEvents';
import Container from '../components/layout/Container';
import EventGrid from '../components/events/EventGrid';
import EventFilters from '../components/browse/EventFilters';

export default function UpcomingEventsPage() {
  const startDate = '2024-12-19T00:00:00Z';
  const [filters, setFilters] = useState({
    keyword: '',
    dateRange: { start: startDate, end: '' },
    priceRange: { min: '', max: '' },
    location: '',
    category: '',
    sort: 'date,asc'
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    keyword: filters.keyword,
    startDateTime: startDate,
    endDateTime: filters.dateRange.end,
    city: filters.location,
    classificationId: filters.category,
    sort: filters.sort
  });

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <p className="text-gray-600 mb-8">
          Browse events from December 19th, 2024 onwards
        </p>

        <div className="space-y-8">
          <EventFilters onFilterChange={setFilters} />
          <EventGrid
            events={events}
            loading={loading}
            error={error}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </Container>
  );
}
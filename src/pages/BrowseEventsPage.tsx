import { useState } from 'react';
import Container from '../components/layout/Container';
import EventFilters from '../components/browse/EventFilters';
import EventGrid from '../components/events/EventGrid';
import { useTicketmasterEvents } from '../hooks/useTicketmasterEvents';

export default function BrowseEventsPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: '', max: '' },
    location: '',
    category: '',
    sort: 'date,asc'
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    keyword: filters.keyword,
    startDateTime: filters.dateRange.start,
    endDateTime: filters.dateRange.end,
    city: filters.location,
    classificationId: filters.category,
    sort: filters.sort
  });

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Events</h1>
        
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
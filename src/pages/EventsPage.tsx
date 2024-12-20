import { useState } from 'react';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import EventFilters from '../components/events/EventFilters';
import EventGrid from '../components/events/EventGrid';
import { useEvents } from '../hooks/useEvents';

export default function EventsPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    sort: 'date,asc'
  });

  const { events, loading, error, hasMore, loadMore } = useEvents(filters);

  return (
    <Container>
      <Section title="Discover Events">
        <EventFilters filters={filters} onChange={setFilters} />
        <EventGrid
          events={events}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </Section>
    </Container>
  );
}
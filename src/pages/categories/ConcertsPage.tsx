import { useState } from 'react';
import { Music } from 'lucide-react';
import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import EventGrid from '../../components/events/EventGrid';
import CategoryHeader from '../../components/categories/CategoryHeader';
import CategoryFilters from '../../components/categories/CategoryFilters';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import { EVENT_CATEGORIES } from '../../config/api';

export default function ConcertsPage() {
  const [filters, setFilters] = useState({
    sort: 'date,asc',
    genreId: '',
    startDate: '',
    endDate: ''
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.MUSIC,
    ...filters
  });

  return (
    <Container>
      <CategoryHeader
        title="Concerts & Music Events"
        description="From chart-topping artists to indie bands, find tickets to the hottest concerts near you."
        icon={<Music className="h-8 w-8" />}
        backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop"
      />

      <Section>
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          genres={[
            { id: 'KnvZfZ7vAvv', name: 'Alternative' },
            { id: 'KnvZfZ7vAve', name: 'Pop' },
            { id: 'KnvZfZ7vAv6', name: 'Rock' },
            { id: 'KnvZfZ7vAv1', name: 'Hip-Hop/Rap' },
            { id: 'KnvZfZ7vAvF', name: 'Electronic' }
          ]}
        />
        
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
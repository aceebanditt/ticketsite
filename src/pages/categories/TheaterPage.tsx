import { useState } from 'react';
import { Theater } from 'lucide-react';
import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import EventGrid from '../../components/events/EventGrid';
import CategoryHeader from '../../components/categories/CategoryHeader';
import CategoryFilters from '../../components/categories/CategoryFilters';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import { EVENT_CATEGORIES } from '../../config/api';

export default function TheaterPage() {
  const [filters, setFilters] = useState({
    sort: 'date,asc',
    genreId: '',
    startDate: '',
    endDate: '',
    priceRange: '',
    city: ''
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.ARTS,
    ...filters
  });

  return (
    <Container>
      <CategoryHeader
        title="Theater & Broadway Shows"
        description="Experience the magic of live theater, from Broadway hits to local productions."
        icon={<Theater className="h-8 w-8" />}
        backgroundImage="https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&auto=format&fit=crop"
      />

      <Section>
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          genres={[
            { id: 'KnvZfZ7v7l1', name: 'Musical' },
            { id: 'KnvZfZ7v7l6', name: 'Play' },
            { id: 'KnvZfZ7v7lR', name: 'Dance' },
            { id: 'KnvZfZ7v7lk', name: 'Opera' },
            { id: 'KnvZfZ7v7l7', name: 'Classical' }
          ]}
          showPriceRange
          showLocationFilter
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
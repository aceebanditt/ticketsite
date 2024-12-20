import { useState } from 'react';
import { Laugh } from 'lucide-react';
import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import EventGrid from '../../components/events/EventGrid';
import CategoryHeader from '../../components/categories/CategoryHeader';
import CategoryFilters from '../../components/categories/CategoryFilters';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import { EVENT_CATEGORIES } from '../../config/api';

export default function ComedyPage() {
  const [filters, setFilters] = useState({
    sort: 'date,asc',
    genreId: '',
    startDate: '',
    endDate: '',
    priceRange: '',
    city: ''
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.COMEDY,
    ...filters
  });

  return (
    <Container>
      <CategoryHeader
        title="Comedy Shows"
        description="Laugh out loud with the best stand-up comedians and comedy shows."
        icon={<Laugh className="h-8 w-8" />}
        backgroundImage="https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1600&auto=format&fit=crop"
      />

      <Section>
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          genres={[
            { id: 'KnvZfZ7vAe1', name: 'Stand Up' },
            { id: 'KnvZfZ7vAe6', name: 'Improv' },
            { id: 'KnvZfZ7vAev', name: 'Sketch Comedy' },
            { id: 'KnvZfZ7vAeA', name: 'Comedy Festival' }
          ]}
          showPriceRange
          showLocationFilter
          showAgeRestriction
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
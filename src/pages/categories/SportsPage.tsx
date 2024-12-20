import { useState } from 'react';
import { Trophy } from 'lucide-react';
import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import EventGrid from '../../components/events/EventGrid';
import CategoryHeader from '../../components/categories/CategoryHeader';
import CategoryFilters from '../../components/categories/CategoryFilters';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import { EVENT_CATEGORIES } from '../../config/api';

export default function SportsPage() {
  const [filters, setFilters] = useState({
    sort: 'date,asc',
    genreId: '',
    startDate: '',
    endDate: ''
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.SPORTS,
    ...filters
  });

  return (
    <Container>
      <CategoryHeader
        title="Sports Events"
        description="Get tickets to the biggest games in professional and collegiate sports."
        icon={<Trophy className="h-8 w-8" />}
        backgroundImage="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop"
      />

      <Section>
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          genres={[
            { id: 'KnvZfZ7vAdE', name: 'Baseball' },
            { id: 'KnvZfZ7vAde', name: 'Basketball' },
            { id: 'KnvZfZ7vAdv', name: 'Football' },
            { id: 'KnvZfZ7vAdA', name: 'Hockey' },
            { id: 'KnvZfZ7vA7E', name: 'Soccer' }
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
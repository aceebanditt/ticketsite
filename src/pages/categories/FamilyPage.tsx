import { useState } from 'react';
import { Heart } from 'lucide-react';
import Container from '../../components/layout/Container';
import Section from '../../components/layout/Section';
import EventGrid from '../../components/events/EventGrid';
import CategoryHeader from '../../components/categories/CategoryHeader';
import CategoryFilters from '../../components/categories/CategoryFilters';
import { useTicketmasterEvents } from '../../hooks/useTicketmasterEvents';
import { EVENT_CATEGORIES } from '../../config/api';

export default function FamilyPage() {
  const [filters, setFilters] = useState({
    sort: 'date,asc',
    genreId: '',
    startDate: '',
    endDate: '',
    priceRange: '',
    city: '',
    ageGroup: ''
  });

  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.FAMILY,
    ...filters
  });

  return (
    <Container>
      <CategoryHeader
        title="Family Events"
        description="Create lasting memories with family-friendly shows and activities for all ages."
        icon={<Heart className="h-8 w-8" />}
        backgroundImage="https://images.unsplash.com/photo-1472711795975-42c5b4ee828c?w=1600&auto=format&fit=crop"
      />

      <Section>
        <CategoryFilters
          filters={filters}
          onChange={setFilters}
          genres={[
            { id: 'KnvZfZ7v7n1', name: "Children's Theater" },
            { id: 'KnvZfZ7v7n6', name: 'Circus' },
            { id: 'KnvZfZ7v7nE', name: 'Ice Shows' },
            { id: 'KnvZfZ7v7nJ', name: 'Magic Shows' },
            { id: 'KnvZfZ7v7na', name: 'Family Entertainment' }
          ]}
          showPriceRange
          showLocationFilter
          showAgeGroups
          showFamilyFeatures
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
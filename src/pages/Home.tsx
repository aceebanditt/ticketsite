import Banner from '../components/home/Banner';
import TrustSection from '../components/home/TrustSection';
import FeaturedEventSlider from '../components/home/FeaturedEventSlider';
import CategorySection from '../components/home/CategorySection';
import { EVENT_CATEGORIES } from '../config/api';
import { useTicketmasterEvents } from '../hooks/useTicketmasterEvents';
import { useFeaturedEvents } from '../hooks/useFeaturedEvents';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function Home() {
  const { events: featuredEvents, loading: featuredLoading, error: featuredError } = useFeaturedEvents();
  
  const { events: concertEvents, loading: concertsLoading, error: concertsError } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.MUSIC,
    sort: 'date,asc',
    size: 12
  });

  const { events: sportsEvents, loading: sportsLoading, error: sportsError } = useTicketmasterEvents({
    classificationId: EVENT_CATEGORIES.SPORTS,
    sort: 'date,asc',
    size: 12
  });

  return (
    <div className="min-h-screen">
      <Banner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 py-12">
          <ErrorBoundary>
            <FeaturedEventSlider
              events={featuredEvents}
              loading={featuredLoading}
              error={featuredError}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <CategorySection
              title="Concerts & Music"
              subtitle="From chart-topping artists to indie bands"
              events={concertEvents}
              loading={concertsLoading}
              error={concertsError}
              viewAllLink="/concerts"
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <CategorySection
              title="Sports"
              subtitle="Get tickets to the biggest games"
              events={sportsEvents}
              loading={sportsLoading}
              error={sportsError}
              viewAllLink="/sports"
            />
          </ErrorBoundary>
        </div>
      </div>

      <TrustSection />
    </div>
  );
}
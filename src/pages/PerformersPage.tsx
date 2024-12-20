import { useState } from 'react';
import { useTicketmasterEvents } from '../hooks/useTicketmasterEvents';
import Container from '../components/layout/Container';
import EventGrid from '../components/events/EventGrid';
import { Search } from 'lucide-react';

export default function PerformersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { events, loading, error, hasMore, loadMore } = useTicketmasterEvents({
    keyword: searchQuery,
    sort: 'relevance,desc'
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is handled automatically by the hook when searchQuery changes
  };

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Popular Performers</h1>
        <p className="text-gray-600 mb-8">
          Discover events from your favorite artists and performers
        </p>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search performers..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 
                         focus:border-[--primary] focus:ring-2 focus:ring-[--primary] focus:ring-opacity-50"
              />
            </div>
          </form>
        </div>

        <EventGrid
          events={events}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
    </Container>
  );
}
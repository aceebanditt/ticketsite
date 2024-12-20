import { useSearchParams } from 'react-router-dom';
import { events } from '../data/events';
import { performers } from '../data/performers';
import { venues } from '../data/venues';
import EventCard from '../components/EventCard';
import PerformerCard from '../components/performer/PerformerCard';
import VenueCard from '../components/venue/VenueCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredEvents = events.filter(
    event => 
      event.title.toLowerCase().includes(query) ||
      event.performer?.toLowerCase().includes(query)
  );

  const filteredPerformers = performers.filter(
    performer => performer.name.toLowerCase().includes(query)
  );

  const filteredVenues = venues.filter(
    venue => venue.name.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Search Results for "{query}"
      </h1>

      {filteredEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {filteredPerformers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPerformers.map(performer => (
              <PerformerCard key={performer.id} performer={performer} />
            ))}
          </div>
        </section>
      )}

      {filteredVenues.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Venues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVenues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}

      {filteredEvents.length === 0 && filteredPerformers.length === 0 && filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';
import { ticketmasterApi } from '../services/ticketmaster';
import Container from '../components/layout/Container';
import EventGrid from '../components/events/EventGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function VenuePage() {
  const { venueId } = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        setLoading(true);
        const [venueData, eventsData] = await Promise.all([
          ticketmasterApi.getVenueSeating(venueId!),
          ticketmasterApi.getEvents({ venueId })
        ]);
        setVenue(venueData);
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to load venue details');
      } finally {
        setLoading(false);
      }
    };

    if (venueId) {
      loadVenueDetails();
    }
  }, [venueId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!venue) return <ErrorMessage message="Venue not found" />;

  return (
    <Container>
      <div className="py-8">
        {/* Venue Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={venue.images?.[0]?.url || 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200'}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
              <div className="flex items-center text-white/90">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {venue.address}, {venue.city}, {venue.state}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About the Venue</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3" />
                  <span>Capacity: {venue.capacity?.toLocaleString() || 'Not specified'}</span>
                </div>
                {venue.generalInfo && (
                  <div className="prose max-w-none">
                    <p>{venue.generalInfo}</p>
                  </div>
                )}
                {venue.accessibleSeatingDetail && (
                  <div>
                    <h3 className="font-medium mb-2">Accessibility Information</h3>
                    <p className="text-gray-600">{venue.accessibleSeatingDetail}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{events.length} Upcoming Events</span>
                </div>
                {/* Add more quick facts here */}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <EventGrid
            events={events}
            loading={false}
            error={null}
            hasMore={false}
          />
        </div>
      </div>
    </Container>
  );
}
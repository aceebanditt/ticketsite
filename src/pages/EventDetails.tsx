import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { ticketmasterApi } from '../services/ticketmaster';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import SeatingChartContainer from '../components/seating/SeatingChartContainer';
import TicketList from '../components/tickets/TicketList';
import VenueInfo from '../components/venue/VenueInfo';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        setLoading(true);
        const data = await ticketmasterApi.getEventDetails(id!);
        setEvent(data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEventDetails();
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  const venue = event._embedded?.venues?.[0];
  const venueId = venue?.id;

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <img
              src={event.images?.find((img: any) => img.ratio === '16_9')?.url || event.images?.[0]?.url}
              alt={event.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <Section>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Event Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{new Date(event.dates.start.dateTime || event.dates.start.localDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                {event.dates.start.localTime && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{new Date(`2000-01-01T${event.dates.start.localTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}</span>
                  </div>
                )}
                {venue && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{venue.name}, {venue.city.name}</span>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {venue && <VenueInfo venue={venue} />}

          {venueId && id && (
            <Section>
              <SeatingChartContainer
                venueId={venueId}
                eventId={id}
                onSectionSelect={setSelectedSection}
              />
            </Section>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Section>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Tickets</h2>
                <TicketList
                  eventId={id!}
                  selectedSection={selectedSection}
                  priceRanges={event.priceRanges}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </Container>
  );
}
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { formatEventDate, formatEventTime } from '../../utils/date';
import { formatCurrency } from '../../utils/format';
import { TicketmasterEvent } from '../../types/api';

interface EventCardProps {
  event: TicketmasterEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const venue = event._embedded?.venues?.[0];
  const mainImage = event.images?.find(img => img.ratio === '16_9')?.url || event.images?.[0]?.url;
  const priceRange = event.priceRanges?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9]">
        <img
          src={mainImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        {priceRange && (
          <div className="absolute top-4 right-4 bg-[--primary] text-white px-3 py-1 rounded-full text-sm font-semibold">
            From {formatCurrency(priceRange.min)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatEventDate(event.dates.start.dateTime || event.dates.start.localDate)}</span>
          </div>
          
          {event.dates.start.localTime && (
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{formatEventTime(event.dates.start.localTime)}</span>
            </div>
          )}
          
          {venue && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{venue.name}, {venue.city?.name}</span>
            </div>
          )}
        </div>

        <Link
          to={`/event/${event.id}`}
          className="flex items-center justify-center w-full px-4 py-2 bg-[--primary] text-white rounded-lg hover:bg-[--primary-dark] transition-colors"
        >
          <Ticket className="h-4 w-4 mr-2" />
          Buy Tickets
        </Link>
      </div>
    </div>
  );
}
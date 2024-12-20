import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatEventDate, formatEventTime } from '../../../utils/date';
import { getEventVenue } from '../../../utils/event';
import { TicketmasterEvent } from '../../../types/api';

interface EventInfoProps {
  event: TicketmasterEvent;
}

export default function EventInfo({ event }: EventInfoProps) {
  const venue = getEventVenue(event);
  
  return (
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
        <span>{formatEventDate(event.dates.start.dateTime || event.dates.start.localDate)}</span>
      </div>
      
      {event.dates.start.localTime && (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span>{formatEventTime(event.dates.start.localTime)}</span>
        </div>
      )}
      
      {venue && (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span className="line-clamp-1">
            {venue.name}, {venue.city?.name}
          </span>
        </div>
      )}
    </div>
  );
}
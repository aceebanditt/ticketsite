import { Link } from 'react-router-dom';
import { TicketmasterEvent } from '../../../types/api';
import EventImage from './EventImage';
import EventInfo from './EventInfo';
import EventPrice from './EventPrice';
import EventStatusBadge from '../EventStatusBadge';
import TicketAvailability from '../../tickets/TicketAvailability';
import { useEventUpdates } from '../../../hooks/useEventUpdates';
import { useTicketUpdates } from '../../../hooks/useTicketUpdates';

interface EventCardProps {
  event: TicketmasterEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const eventUpdates = useEventUpdates(event.id);
  const ticketUpdates = useTicketUpdates(event.id);

  const status = eventUpdates?.status || event.dates.status.code;
  const availability = eventUpdates?.availability || { status: 'AVAILABLE' };

  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden card-hover">
        <div className="relative">
          <EventImage event={event} />
          {status !== 'SCHEDULED' && (
            <div className="absolute top-4 right-4">
              <EventStatusBadge status={status} />
            </div>
          )}
          <EventPrice event={event} />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[--primary] transition-colors line-clamp-2 mb-2">
            {event.name}
          </h3>
          
          <EventInfo event={event} />

          <div className="mt-4 flex justify-between items-center">
            <TicketAvailability
              status={availability.status}
              remaining={availability.remaining}
            />
            <span className="inline-block bg-blue-50 text-[--primary] text-sm font-medium px-3 py-1 rounded-full">
              View Tickets
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
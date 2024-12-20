import { getEventImage } from '../../../utils/event';
import { TicketmasterEvent } from '../../../types/api';

interface EventImageProps {
  event: TicketmasterEvent;
  className?: string;
}

export default function EventImage({ event, className = '' }: EventImageProps) {
  const mainImage = getEventImage(event);

  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${className}`}>
      <img
        src={mainImage}
        alt={event.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  );
}
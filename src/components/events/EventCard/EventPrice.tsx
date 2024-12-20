import { formatCurrency } from '../../../utils/format';
import { getEventPriceRange } from '../../../utils/event';
import { TicketmasterEvent } from '../../../types/api';

interface EventPriceProps {
  event: TicketmasterEvent;
  className?: string;
}

export default function EventPrice({ event, className = '' }: EventPriceProps) {
  const priceRange = getEventPriceRange(event);
  
  if (!priceRange) return null;

  return (
    <div className={`absolute top-4 left-4 bg-[--primary] text-white px-3 py-1 rounded-full text-sm font-semibold ${className}`}>
      From {formatCurrency(priceRange.min)}
    </div>
  );
}
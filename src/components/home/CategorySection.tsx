import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import EventSlider from './EventSlider';
import { TicketmasterEvent } from '../../types/api';

interface CategorySectionProps {
  title: string;
  subtitle: string;
  events: TicketmasterEvent[];
  loading: boolean;
  error: Error | null;
  viewAllLink: string;
}

export default function CategorySection({
  title,
  subtitle,
  events,
  loading,
  error,
  viewAllLink
}: CategorySectionProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        <Link
          to={viewAllLink}
          className="flex items-center text-[--primary] hover:text-[--primary-dark] font-semibold"
        >
          View All
          <ChevronRight className="h-5 w-5 ml-1" />
        </Link>
      </div>

      <EventSlider
        events={events}
        loading={loading}
        error={error}
      />
    </div>
  );
}
import { MapPin, Users } from 'lucide-react';
import { Venue } from '../../types';

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer">
      <div className="relative h-48">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            {venue.city}, {venue.state}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            Capacity: {venue.capacity.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
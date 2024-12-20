import { MapPin, Users, Info } from 'lucide-react';

interface VenueInfoProps {
  venue: any;
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  if (!venue) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-1" />
          <div>
            <p className="font-medium">{venue.name}</p>
            <p className="text-sm text-gray-500">
              {venue.address?.line1}
              {venue.city?.name && `, ${venue.city.name}`}
              {venue.state?.stateCode && `, ${venue.state.stateCode}`}
              {venue.postalCode && ` ${venue.postalCode}`}
            </p>
          </div>
        </div>

        {venue.generalInfo && (
          <div className="flex items-start">
            <Info className="h-5 w-5 mr-3 text-gray-400 mt-1" />
            <div className="text-sm text-gray-600">
              <p>{venue.generalInfo.generalRule}</p>
            </div>
          </div>
        )}

        {venue.accessibleSeatingDetail && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Accessibility Information</h3>
            <p className="text-sm text-gray-600">{venue.accessibleSeatingDetail}</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { Calendar, MapPin, Clock, Ticket, Share2, Heart } from 'lucide-react';
import { formatEventDate, formatEventTime } from '../../utils/date';
import { formatCurrency } from '../../utils/format';
import { TicketmasterEvent } from '../../types/api';

interface EventDetailsProps {
  event: TicketmasterEvent;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const venue = event._embedded?.venues?.[0];
  const mainImage = event.images?.find((img) => img.ratio === '16_9')?.url || event.images?.[0]?.url;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative aspect-[2/1]">
        <img
          src={mainImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              <span>{formatEventDate(event.dates.start.dateTime || event.dates.start.localDate)}</span>
            </div>
            {event.dates.start.localTime && (
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                <span>{formatEventTime(event.dates.start.localTime)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 p-8">
        <div className="md:col-span-2 space-y-8">
          {venue && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
              <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                <MapPin className="h-6 w-6 mr-3 text-[--primary] mt-1" />
                <div>
                  <p className="font-bold text-lg">{venue.name}</p>
                  <p className="text-gray-600">
                    {venue.address?.line1}
                    {venue.city?.name && `, ${venue.city.name}`}
                    {venue.state?.stateCode && `, ${venue.state.stateCode}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {event.info && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Event Information</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">{event.info}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            {event.priceRanges && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Ticket Prices</h3>
                <div className="space-y-2">
                  {event.priceRanges.map((range, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{range.type}</span>
                      <span className="font-bold">
                        {formatCurrency(range.min)} - {formatCurrency(range.max)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button className="w-full btn-primary flex items-center justify-center">
                <Ticket className="h-5 w-5 mr-2" />
                Get Tickets
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
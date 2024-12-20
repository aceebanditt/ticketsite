import { TicketmasterEvent } from '../../types/api';

export function transformEventData(data: any): Partial<TicketmasterEvent> {
  if (!data) return {};

  // Create a new plain object with only the data we need
  const transformedData = {
    id: data.id,
    name: data.name,
    dates: {
      start: {
        dateTime: data.dates?.start?.dateTime,
        localDate: data.dates?.start?.localDate,
        localTime: data.dates?.start?.localTime
      },
      status: {
        code: data.dates?.status?.code
      }
    },
    images: data.images?.map((img: any) => ({
      url: img.url,
      ratio: img.ratio,
      width: img.width,
      height: img.height
    })) || [],
    priceRanges: data.priceRanges?.map((price: any) => ({
      type: price.type,
      currency: price.currency,
      min: price.min,
      max: price.max
    })) || [],
    _embedded: data._embedded ? {
      venues: data._embedded.venues?.map((venue: any) => ({
        id: venue.id,
        name: venue.name,
        city: venue.city ? { name: venue.city.name } : undefined,
        state: venue.state ? { stateCode: venue.state.stateCode } : undefined,
        address: venue.address ? { line1: venue.address.line1 } : undefined
      }))
    } : undefined,
    info: data.info,
    pleaseNote: data.pleaseNote
  };

  // Ensure the object is fully serializable
  return JSON.parse(JSON.stringify(transformedData));
}
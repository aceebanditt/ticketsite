export interface TicketmasterEvent {
  id: string;
  name: string;
  dates: {
    start: {
      dateTime?: string;
      localDate: string;
      localTime?: string;
    };
    status: {
      code: string;
    };
  };
  images: Array<{
    url: string;
    ratio: string;
    width: number;
    height: number;
  }>;
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  _embedded?: {
    venues?: Array<{
      id: string;
      name: string;
      city?: {
        name: string;
      };
      state?: {
        stateCode: string;
      };
      address?: {
        line1: string;
      };
    }>;
  };
  info?: string;
  pleaseNote?: string;
}

export interface EventSearchResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
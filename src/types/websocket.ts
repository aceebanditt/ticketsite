export interface EventUpdate {
  type: 'EVENT_UPDATE';
  eventId: string;
  updates: {
    availability?: {
      status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT';
      remaining?: number;
    };
    pricing?: {
      min: number;
      max: number;
      currency: string;
    };
    status?: 'SCHEDULED' | 'CANCELLED' | 'POSTPONED' | 'RESCHEDULED';
    newDate?: string;
  };
}

export interface TicketUpdate {
  type: 'TICKET_UPDATE';
  eventId: string;
  sectionId: string;
  updates: {
    available: number;
    price: number;
    status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT';
  };
}
export interface TicketmasterParams {
  city?: string;
  stateCode?: string;
  countryCode?: string;
  startDateTime?: string;
  endDateTime?: string;
  size?: number;
  page?: number;
  sort?: string;
  classificationId?: string;
  keyword?: string;
}

export interface TicketmasterError {
  status: number;
  message: string;
  code?: string;
  details?: string;
}
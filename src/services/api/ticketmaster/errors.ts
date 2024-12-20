export class TicketmasterApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'TicketmasterApiError';
  }

  static fromResponse(error: any): TicketmasterApiError {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An unknown error occurred';
    const code = error.response?.data?.code;

    switch (status) {
      case 401:
        return new TicketmasterApiError('Invalid API key', status, 'INVALID_API_KEY');
      case 429:
        return new TicketmasterApiError('Rate limit exceeded', status, 'RATE_LIMIT');
      case 404:
        return new TicketmasterApiError('No events found', status, 'NOT_FOUND');
      default:
        return new TicketmasterApiError(message, status, code);
    }
  }
}
// Environment variables in Vite are exposed through import.meta.env
export const config = {
  apiKey: import.meta.env.VITE_TICKETMASTER_API_KEY || '',
  apiBaseUrl: 'https://app.ticketmaster.com/discovery/v2',
  wsUrl: import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-websocket-server.com'
} as const;
export const TICKETMASTER_CONFIG = {
  API_KEY: import.meta.env.VITE_TICKETMASTER_API_KEY,
  BASE_URL: 'https://app.ticketmaster.com/discovery/v2',
  DEFAULT_PARAMS: {
    locale: '*',
    includeTBA: 'no',
    includeTBD: 'no',
    includeTest: 'no'
  },
  PAGE_SIZE: 20,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
} as const;

export const EVENT_CATEGORIES = {
  MUSIC: 'KZFzniwnSyZfZ7v7nJ',
  SPORTS: 'KZFzniwnSyZfZ7v7nE',
  ARTS: 'KZFzniwnSyZfZ7v7na',
  FAMILY: 'KZFzniwnSyZfZ7v7n1'
} as const;

export const SORT_OPTIONS = {
  DATE_ASC: 'date,asc',
  DATE_DESC: 'date,desc',
  RELEVANCE: 'relevance,desc',
  NAME_ASC: 'name,asc',
  NAME_DESC: 'name,desc'
} as const;
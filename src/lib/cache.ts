interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class APICache {
  private cache: Map<string, CacheItem<any>>;
  private cacheDuration: number;

  constructor(cacheDuration: number) {
    this.cache = new Map();
    this.cacheDuration = cacheDuration;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    const isExpired = Date.now() - item.timestamp > this.cacheDuration;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new APICache(TICKETMASTER_CONFIG.CACHE_DURATION);
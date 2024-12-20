interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function useCache(key: string, duration: number) {
  const prefix = 'events-cache-';
  
  const get = <T>(cacheKey: string): T | null => {
    try {
      const item = localStorage.getItem(`${prefix}${key}-${cacheKey}`);
      if (!item) return null;
      
      const { data, timestamp }: CacheItem<T> = JSON.parse(item);
      if (Date.now() - timestamp > duration) {
        localStorage.removeItem(`${prefix}${key}-${cacheKey}`);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  };

  const set = <T>(cacheKey: string, data: T): void => {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${prefix}${key}-${cacheKey}`, JSON.stringify(item));
    } catch {
      // Ignore cache errors
    }
  };

  const clear = (): void => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
  };

  return { get, set, clear };
}
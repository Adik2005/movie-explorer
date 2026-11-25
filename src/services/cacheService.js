const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

export const getCachedData = async (key, fetcher) => {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return cached.data;
  }

  const freshData = await fetcher();
  cache.set(key, { data: freshData, timestamp: now });
  return freshData;
};

export const invalidateCache = (key) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};
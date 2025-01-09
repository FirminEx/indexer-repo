import NodeCache from 'node-cache';

// Create cache instance with default TTL of 5 minutes
export const cache = new NodeCache({
  stdTTL: 300, // 5 minutes in seconds
  checkperiod: 60, // Check for expired keys every 60 seconds
});

export const CACHE_KEYS = {
  USER_OPERATION_EVENTS: 'user-operation-events',
};

export function getCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc: Record<string, any>, key) => {
      if (params[key] !== undefined) {
        acc[key] = params[key];
      }
      return acc;
    }, {});

  return `${prefix}:${JSON.stringify(sortedParams)}`;
}

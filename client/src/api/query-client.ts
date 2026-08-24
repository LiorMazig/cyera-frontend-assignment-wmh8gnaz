import { QueryClient } from '@tanstack/react-query';

/**
 * Scan data is immutable seed data, so a year/provider combination is fetched
 * once and then served from cache: `staleTime: Infinity` stops react-query from
 * revalidating in the background when you return to a combination you already
 * visited, and `gcTime: Infinity` keeps inactive combinations from being
 * evicted while the tab is open.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});

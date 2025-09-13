import { useQuery } from '@tanstack/react-query';

import { fetchTubeStatuses } from '../services/tfl';
import type { Line } from '../types/tfl';

export function useTubeStatuses() {
  return useQuery<Line[]>({
    queryKey: ['tubeStatuses'],
    queryFn: ({ signal }) => fetchTubeStatuses({ signal }),
    staleTime: 10_000,
    refetchInterval: 20_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}

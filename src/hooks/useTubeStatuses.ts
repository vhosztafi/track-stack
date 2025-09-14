import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetchTubeStatuses } from '../services/tfl';
import type { Line } from '../types/tfl';

export function useTubeStatuses() {
  const query = useQuery<Line[]>({
    queryKey: ['tubeStatuses'],
    queryFn: ({ signal }) => fetchTubeStatuses({ signal }),
    staleTime: 10_000,
    refetchInterval: 20_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const lastUpdatedAt = useMemo(
    () => (query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : undefined),
    [query.dataUpdatedAt]
  );

  return { ...query, lastUpdatedAt };
}

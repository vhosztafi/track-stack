import { get } from '../lib/axios';
import type { Line } from '../types/tfl';

export function fetchTubeStatuses(opts?: { signal?: AbortSignal }) {
  return get<Line[]>('/Line/Mode/Tube/Status', { signal: opts?.signal });
}

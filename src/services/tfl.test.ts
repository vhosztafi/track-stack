import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '../test/msw/server';
import { fetchTubeStatuses } from './tfl';

describe('fetchTubeStatuses', () => {
  it('returns data on success', async () => {
    const res = await fetchTubeStatuses();
    expect(res[0].name).toBe('Bakerloo');
  });

  it('throws on non-200', async () => {
    server.use(
      http.get(
        'https://api.tfl.gov.uk/Line/Mode/Tube/Status',
        () => new HttpResponse(null, { status: 500 })
      )
    );
    await expect(fetchTubeStatuses()).rejects.toThrow(/500/);
  });

  it('supports cancellation', async () => {
    server.use(
      http.get('https://api.tfl.gov.uk/Line/Mode/Tube/Status', async () => {
        await new Promise((r) => setTimeout(r, 50));
        return HttpResponse.json([]);
      })
    );
    const controller = new AbortController();
    const p = fetchTubeStatuses({ signal: controller.signal });
    controller.abort();
    await expect(p).rejects.toBeTruthy();
  });
});

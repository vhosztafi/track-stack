import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '../test/msw/server';
import { useTubeStatuses } from './useTubeStatuses';

function Demo() {
  const { data, isLoading } = useTubeStatuses();
  if (isLoading) return <div>loading</div>;
  return <div>{data?.[0].name}</div>;
}

describe('useTubeStatuses', () => {
  it('goes loading => data and caches', async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
    const { rerender } = render(
      <QueryClientProvider client={qc}>
        <Demo />
      </QueryClientProvider>
    );

    expect(screen.getByText('loading')).toBeTruthy();
    await screen.findByText('Bakerloo');

    rerender(
      <QueryClientProvider client={qc}>
        <Demo />
      </QueryClientProvider>
    );
    expect(screen.queryByText('loading')).toBeNull();
    expect(screen.getByText('Bakerloo')).toBeTruthy();
  });

  it('refetches and updates (deterministic)', async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <Demo />
      </QueryClientProvider>
    );

    await screen.findByText('Bakerloo');

    server.use(
      http.get(/\/Line\/Mode\/Tube\/Status(?:\?.*)?$/, () =>
        HttpResponse.json([
          {
            id: 'victoria',
            name: 'Victoria',
            modeName: 'tube',
            lineStatuses: [
              { id: 0, statusSeverity: 10, statusSeverityDescription: 'Good Service' },
            ],
          },
        ])
      )
    );

    await qc.refetchQueries({ queryKey: ['tubeStatuses'] });

    expect(await screen.findByText('Victoria')).toBeTruthy();
  });
});

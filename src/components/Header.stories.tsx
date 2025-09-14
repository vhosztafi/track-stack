import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import Header from './Header';

type StoryArgs = {
  isLoading: boolean;
  lastUpdatedISO?: string;
};

function HeaderHarness({ isLoading, lastUpdatedISO }: StoryArgs) {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            gcTime: 5 * 60_000,
          },
        },
      }),
    []
  );

  useEffect(() => {
    const key = ['tubeStatuses'];

    if (isLoading) {
      client.setQueryDefaults(key, {
        enabled: true,
        queryFn: () => new Promise<unknown>(() => {}),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 0,
      });
      client.removeQueries({ queryKey: key });
      return;
    }

    client.setQueryDefaults(key, {
      enabled: false,
      queryFn: async () => [],
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    });

    if (lastUpdatedISO) {
      const ts = new Date(lastUpdatedISO).getTime();
      if (!Number.isNaN(ts)) {
        client.setQueryData(key, [], { updatedAt: ts });
      } else {
        client.removeQueries({ queryKey: key });
      }
    } else {
      client.removeQueries({ queryKey: key });
    }
  }, [client, isLoading, lastUpdatedISO]);

  return (
    <QueryClientProvider client={client}>
      <Header />
    </QueryClientProvider>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Layout/Header',
  component: HeaderHarness,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    isLoading: false,
    lastUpdatedISO: undefined,
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'When true, keeps the underlying query pending to show the loading state.',
    },
    lastUpdatedISO: {
      control: 'text',
      description:
        'ISO string for the "Last updated" time. Leave empty to show "Never" (no cached data).',
    },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Never: Story = {
  name: 'Last updated: Never',
  args: {
    isLoading: false,
    lastUpdatedISO: undefined,
  },
};

export const WithTimestamp: Story = {
  name: 'With timestamp',
  args: {
    isLoading: false,
    lastUpdatedISO: '2024-01-02T03:04:05.000Z',
  },
};

export const Loading: Story = {
  name: 'Loading',
  args: {
    isLoading: true,
    lastUpdatedISO: undefined,
  },
};

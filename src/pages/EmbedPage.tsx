import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import EmbedLayout from '../components/EmbedLayout';
import LineStatusGrid from '../components/LineStatusGrid.tsx';
import { Loader } from '../components/Loader.tsx';
import Tabs, { type TabItem } from '../components/Tabs.tsx';
import { useTubeStatuses } from '../hooks/useTubeStatuses.ts';
import { mapToVM } from '../lib/utils.ts';

export default function EmbedPage() {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['all', 'active', 'paused'].includes(tabParam)) {
      setSelectedTab(tabParam);
    }
  }, [searchParams]);
  const { data, isLoading, error, isError } = useTubeStatuses();

  const items = useMemo(() => mapToVM(data ?? []), [data]);

  const filtered = useMemo(
    () =>
      items?.filter((l) => {
        switch (selectedTab) {
          case 'all':
            return true;
          case 'active':
            return !l.canExpand;
          case 'paused':
            return l.canExpand;
          default:
            return true;
        }
      }),
    [items, selectedTab]
  );

  const hideTabs = searchParams.get('hideTabs') === 'true';
  const hideTitle = searchParams.get('hideTitle') === 'true';

  const tabs: TabItem[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'paused', label: 'Paused' },
  ];

  return (
    <EmbedLayout>
      <section aria-labelledby="status-heading" className="mx-auto max-w-[1440px]">
        {!hideTitle && (
          <h1 id="status-heading" className="mb-6 text-3xl font-400 text-tfl-ink sm:text-4xl">
            Status
          </h1>
        )}

        {isError && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-lg text-red-600">
              Error loading tube statuses: {(error as Error).message || 'Unknown error'}
            </div>
          </div>
        )}

        {!isError && !hideTabs && (
          <Tabs
            items={tabs}
            value={selectedTab}
            onValueChange={(id) => setSelectedTab(id)}
            bordered={false}
          />
        )}

        {isLoading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader text="Loading tube statuses..." size="lg" variant="simple" />
          </div>
        )}

        {filtered.length > 0 ? (
          <LineStatusGrid items={filtered || []} />
        ) : (
          <div className="text-lg">No tube statuses found</div>
        )}
      </section>
    </EmbedLayout>
  );
}

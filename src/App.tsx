import './styles/global.css';

import { useMemo, useState } from 'react';

import Layout from './components/Layout';
import LineStatusGrid from './components/LineStatusGrid.tsx';
import { Loader } from './components/Loader.tsx';
import Tabs, { type TabItem } from './components/Tabs.tsx';
import { useTubeStatuses } from './hooks/useTubeStatuses.ts';
import { mapToVM } from './lib/utils.ts';

function App() {
  const [selectedTab, setSelectedTab] = useState('all');
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

  const tabs: TabItem[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'paused', label: 'Paused' },
  ];

  return (
    <>
      <Layout>
        <section aria-labelledby="status-heading" className="mx-auto max-w-[1440px]">
          <h1 id="status-heading" className="mb-8 text-6xl font-400 text-tfl-ink">
            Status
          </h1>

          {isError && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-lg text-red-600">
                Error loading tube statuses: {(error as Error).message || 'Unknown error'}
              </div>
            </div>
          )}

          {!isError && (
            <Tabs items={tabs} onValueChange={(id) => setSelectedTab(id)} bordered={false} />
          )}

          {!isLoading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader text="Loading tube statuses..." size="lg" variant="simple" />
            </div>
          )}

          {filtered.length > 0 ? (
            <LineStatusGrid items={filtered || []} />
          ) : (
            <div className="text-lg">No tube statuses found</div>
          )}
        </section>
      </Layout>
    </>
  );
}

export default App;

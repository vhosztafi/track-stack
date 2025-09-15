import './styles/global.css';

import { useMemo, useState } from 'react';

import Layout from './components/Layout';
import LineStatusGrid from './components/LineStatusGrid.tsx';
import Tabs, { type TabItem } from './components/Tabs.tsx';
import { useTubeStatuses } from './hooks/useTubeStatuses.ts';
import { mapToVM } from './lib/utils.ts';

function App() {
  const [selectedTab, setSelectedTab] = useState('all');
  const { data } = useTubeStatuses();

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

          <Tabs items={tabs} onValueChange={(id) => setSelectedTab(id)} bordered={false} />
          <LineStatusGrid items={filtered || []} />
        </section>
      </Layout>
    </>
  );
}

export default App;

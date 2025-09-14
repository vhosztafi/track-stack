import './styles/global.css';

import { useState } from 'react';

import Layout from './components/Layout';
import Tabs from './components/Tabs.tsx';

function App() {
  const [, setSelectedTab] = useState('all');

  const tabs = [
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

          <Tabs items={tabs} onValueChange={(id) => setSelectedTab(id)} bordered={true} />
        </section>
      </Layout>
    </>
  );
}

export default App;

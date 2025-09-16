import './styles/global.css';

import EmbedLayout from './components/EmbedLayout.tsx';
import Layout from './components/Layout.tsx';
import { getBoolParam, useQueryParamsReadOnly } from './hooks/useQueryParamsReadOnly.tsx';
import HomePage from './pages/HomePage';

function App() {
  const params = useQueryParamsReadOnly();
  const isEmbedMode = params.get('view') === 'embed';
  const hideTabs = getBoolParam(params, 'hideTabs') ?? false;
  const hideTitle = getBoolParam(params, 'hideTitle') ?? false;
  const tabParam = params.get('tab') ?? undefined;

  return isEmbedMode ? (
    <EmbedLayout>
      <HomePage
        isEmbedMode={isEmbedMode}
        hideTabs={hideTabs ?? false}
        hideTitle={hideTitle ?? false}
        tabParam={tabParam}
      />
    </EmbedLayout>
  ) : (
    <Layout>
      <HomePage
        isEmbedMode={isEmbedMode}
        hideTabs={hideTabs ?? false}
        hideTitle={hideTitle ?? false}
        tabParam={tabParam}
      />
    </Layout>
  );
}

export default App;

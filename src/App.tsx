import './styles/global.css';

import SkipLinksGroup from './components/SkipLinksGroup';

function App() {
  const lastUpdated = new Date().toLocaleTimeString();

  return (
    <>
      <SkipLinksGroup
        links={[
          { targetId: 'main-content', label: 'Skip to content' },
          { targetId: 'main-nav', label: 'Skip to navigation' },
          { targetId: 'footer', label: 'Skip to footer' },
        ]}
      />

      <nav id="main-nav" className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">TrackStack</h1>
          <div>Last updated: {lastUpdated}</div>
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            Statuses updated at {lastUpdated}
          </div>
        </div>
      </nav>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex h-screen items-center justify-center bg-gray-100"
      >
        <h1 className="text-4xl font-bold text-blue-600">TrackStack App</h1>
      </main>
      <footer id="footer" className="bg-blue-600 p-4 text-center text-white">
        &copy; {new Date().getFullYear()} TrackStack
      </footer>
    </>
  );
}

export default App;

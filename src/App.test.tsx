import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders heading', () => {
  const qc = new QueryClient();
  render(
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  );
  expect(screen.getByRole('heading', { name: /status/i })).toBeInTheDocument();
});

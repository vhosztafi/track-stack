/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';

vi.mock('./hooks/useTubeStatuses', () => ({
  useTubeStatuses: vi.fn(),
}));

const mockUseTubeStatuses = vi.mocked((await import('./hooks/useTubeStatuses')).useTubeStatuses);

const renderApp = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

  return render(
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);
  });

  it('renders home page by default at root route', () => {
    renderApp();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /status/i })).toBeInTheDocument();
  });

  it('renders home page with larger heading text', () => {
    renderApp();

    const heading = screen.getByRole('heading', { name: /status/i });
    expect(heading).toHaveClass('text-4xl', 'sm:text-6xl');
  });
});

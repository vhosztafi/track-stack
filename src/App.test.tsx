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

  it('uses regular Layout with header and footer', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderApp();

    expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to footer/i })).toBeInTheDocument();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

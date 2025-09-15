/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmbedPage from './EmbedPage';

vi.mock('../hooks/useTubeStatuses', () => ({
  useTubeStatuses: vi.fn(),
}));

const mockUseTubeStatuses = vi.mocked((await import('../hooks/useTubeStatuses')).useTubeStatuses);

const renderEmbedPage = (initialEntries = ['/embed']) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={initialEntries}>
        <EmbedPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('EmbedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the embed page with status heading', async () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage();

    expect(screen.getByRole('heading', { name: /status/i })).toBeInTheDocument();
  });

  it('renders loading state', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage();

    expect(screen.getByText(/loading tube statuses/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Network error';
    mockUseTubeStatuses.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
      isError: true,
    } as any);

    renderEmbedPage();

    expect(screen.getByText(/error loading tube statuses/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
  });

  it('renders tabs by default', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /paused/i })).toBeInTheDocument();
  });

  it('hides tabs when hideTabs=true URL parameter is present', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    Object.defineProperty(window, 'location', {
      value: {
        search: '?hideTabs=true',
      },
      writable: true,
    });

    renderEmbedPage(['/embed?hideTabs=true']);

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('hides title when hideTitle=true URL parameter is present', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage(['/embed?hideTitle=true']);

    expect(screen.queryByRole('heading', { name: /status/i })).not.toBeInTheDocument();
  });

  it('sets initial tab from URL parameter', async () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage(['/embed?tab=active']);

    await waitFor(() => {
      const activeTab = screen.getByRole('tab', { name: /active/i });
      expect(activeTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('sets initial tab from URL parameter for paused', async () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage(['/embed?tab=paused']);

    await waitFor(() => {
      const pausedTab = screen.getByRole('tab', { name: /paused/i });
      expect(pausedTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('ignores invalid tab parameter and defaults to all', async () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage(['/embed?tab=invalid']);

    await waitFor(() => {
      const allTab = screen.getByRole('tab', { name: /all/i });
      expect(allTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('renders no tube statuses message when data is empty', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage();

    expect(screen.getByText(/no tube statuses found/i)).toBeInTheDocument();
  });

  it('uses EmbedLayout instead of regular Layout', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage();

    expect(screen.queryByRole('link', { name: /skip to content/i })).not.toBeInTheDocument();

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('handles multiple URL parameters correctly', async () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderEmbedPage(['/embed?tab=active&hideTitle=true&hideTabs=true']);

    expect(screen.queryByRole('heading', { name: /status/i })).not.toBeInTheDocument();

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });
});

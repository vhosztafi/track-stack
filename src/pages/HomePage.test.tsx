/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import HomePage from './HomePage';

vi.mock('../hooks/useTubeStatuses', () => ({
  useTubeStatuses: vi.fn(),
}));

const mockUseTubeStatuses = vi.mocked((await import('../hooks/useTubeStatuses')).useTubeStatuses);

const renderHomePage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

  return render(
    <QueryClientProvider client={qc}>
      <HomePage />
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the home page with status heading', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    expect(screen.getByRole('heading', { name: /status/i })).toBeInTheDocument();
  });

  it('renders loading state', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

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

    renderHomePage();

    expect(screen.getByText(/error loading tube statuses/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
  });

  it('renders tabs with correct labels', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /paused/i })).toBeInTheDocument();
  });

  it('defaults to all tab selected', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    const allTab = screen.getByRole('tab', { name: /all/i });
    expect(allTab).toHaveAttribute('aria-selected', 'true');
  });

  it('renders no tube statuses message when data is empty', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    expect(screen.getByText(/no tube statuses found/i)).toBeInTheDocument();
  });

  it('uses regular Layout with header and footer', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to footer/i })).toBeInTheDocument();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has larger heading text compared to embed page', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    const heading = screen.getByRole('heading', { name: /status/i });
    expect(heading).toHaveClass('text-4xl', 'sm:text-6xl');
  });

  it('has larger loading container compared to embed page', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    renderHomePage();

    const loadingContainer = screen
      .getByText(/loading tube statuses/i)
      .closest('div')?.parentElement;
    expect(loadingContainer).toHaveClass('min-h-[400px]');
  });

  it('has larger error container compared to embed page', () => {
    mockUseTubeStatuses.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Test error'),
      isError: true,
    } as any);

    renderHomePage();

    const errorContainer = screen
      .getByText(/error loading tube statuses/i)
      .closest('div')?.parentElement;
    expect(errorContainer).toHaveClass('min-h-[400px]');
  });
});

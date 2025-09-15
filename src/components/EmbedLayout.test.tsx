import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import EmbedLayout from './EmbedLayout';

describe('EmbedLayout', () => {
  it('renders the main landmark with the correct id and renders children inside it', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <EmbedLayout>
          <h1>Test Embed Page</h1>
          <p>Some embed content</p>
        </EmbedLayout>
      </QueryClientProvider>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabindex', '-1');

    const utils = within(main);
    expect(utils.getByRole('heading', { name: /test embed page/i })).toBeInTheDocument();
    expect(utils.getByText(/some embed content/i)).toBeInTheDocument();
  });

  it('does not render skip links (unlike regular Layout)', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <EmbedLayout>
          <h1>Test Embed Page</h1>
        </EmbedLayout>
      </QueryClientProvider>
    );

    expect(screen.queryByRole('link', { name: /skip to content/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /skip to navigation/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /skip to footer/i })).not.toBeInTheDocument();
  });

  it('does not render header or footer landmarks (unlike regular Layout)', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <EmbedLayout>
          <h1>Test Embed Page</h1>
        </EmbedLayout>
      </QueryClientProvider>
    );

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('applies minimal styling with reduced padding for embed use', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <EmbedLayout>
          <h1>Test Embed Page</h1>
        </EmbedLayout>
      </QueryClientProvider>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveClass('py-4');
  });

  it('maintains the same background and text colors as regular Layout', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <EmbedLayout>
          <h1>Test Embed Page</h1>
        </EmbedLayout>
      </QueryClientProvider>
    );

    const main = screen.getByRole('main');
    const container = main.parentElement;
    expect(container).toHaveClass('bg-slate-50', 'text-tfl-ink');
  });
});

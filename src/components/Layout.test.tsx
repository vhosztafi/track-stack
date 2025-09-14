import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Layout from './Layout';

describe('Layout', () => {
  it('renders the main landmark with the correct id and renders children inside it', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <Layout>
          <h1>Test Page</h1>
          <p>Some content</p>
        </Layout>
      </QueryClientProvider>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
    // Supports programmatic focus when skipping
    expect(main).toHaveAttribute('tabindex', '-1');

    // Children should be inside main
    const utils = within(main);
    expect(utils.getByRole('heading', { name: /test page/i })).toBeInTheDocument();
    expect(utils.getByText(/some content/i)).toBeInTheDocument();
  });

  it('includes skip links for content, navigation, and footer with correct targets', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <Layout>
          <h1>Test Page</h1>
        </Layout>
      </QueryClientProvider>
    );

    const skipToContent = screen.getByRole('link', { name: /skip to content/i });
    const skipToNav = screen.getByRole('link', { name: /skip to navigation/i });
    const skipToFooter = screen.getByRole('link', { name: /skip to footer/i });

    expect(skipToContent).toHaveAttribute('href', '#main-content');
    expect(skipToNav).toHaveAttribute('href', '#main-nav');
    expect(skipToFooter).toHaveAttribute('href', '#footer');
  });

  it('renders global landmarks: banner (header) and contentinfo (footer)', () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

    render(
      <QueryClientProvider client={qc}>
        <Layout>
          <h1>Test Page</h1>
        </Layout>
      </QueryClientProvider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

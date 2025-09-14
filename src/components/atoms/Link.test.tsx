import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Link } from './Link';

describe('Link', () => {
  it('renders internal link and supports aria-current', async () => {
    render(
      <Link href="/status/tube" aria-current="page">
        Status
      </Link>
    );
    const a = screen.getByRole('link', { name: 'Status' });
    expect(a).toHaveAttribute('href', '/status/tube');
    expect(a).toHaveAttribute('aria-current', 'page');
  });

  it('adds rel noopener/noreferrer for external links', () => {
    render(
      <Link href="https://tfl.gov.uk" external>
        Plan
      </Link>
    );
    const a = screen.getByRole('link', { name: 'Plan' });
    expect(a).toHaveAttribute('rel');
    expect(a.getAttribute('rel')).toMatch(/noopener/);
    expect(a.getAttribute('rel')).toMatch(/noreferrer/);
  });

  it('adds target _blank and a11y label when newTab', () => {
    render(
      <Link href="https://tfl.gov.uk" external newTab>
        Plan
      </Link>
    );
    const a = screen.getByRole('link', { name: /opens in a new tab/i });
    expect(a).toHaveAttribute('target', '_blank');
  });

  it('is keyboard-focusable', async () => {
    render(<Link href="/hello">Hello</Link>);
    const a = screen.getByRole('link', { name: 'Hello' });
    await userEvent.tab();
    expect(a).toHaveFocus();
  });
});

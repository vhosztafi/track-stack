import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Header from './Header';

const mockRefetch = vi.fn(() => Promise.resolve());
let mockState: {
  lastUpdatedAt?: Date;
  isLoading: boolean;
  refetch: typeof mockRefetch;
};

vi.mock('../hooks/useTubeStatuses.ts', () => ({
  useTubeStatuses: () => mockState,
}));

describe('Header', () => {
  beforeEach(() => {
    mockState = {
      lastUpdatedAt: undefined,
      isLoading: false,
      refetch: mockRefetch,
    };
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders brand link to home with product name', () => {
    render(<Header />);

    const brandLink = screen.getByRole('link', { name: /trackstack/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('shows "Last updated: Never" when no timestamp available', () => {
    render(<Header />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('id', 'last-updated');
    expect(status).toHaveTextContent(/last updated/i);
    expect(within(status).getByText(/never/i)).toBeInTheDocument();
  });

  it('renders the last updated time when available', () => {
    const fixed = new Date('2024-01-02T03:04:05.000Z');
    mockState.lastUpdatedAt = fixed;

    render(<Header />);

    const status = screen.getByRole('status');
    const timeEl = within(status).getByRole('time', { hidden: true }) as HTMLTimeElement | null;

    const timeNode = timeEl ?? (status.querySelector('time') as HTMLTimeElement);
    expect(timeNode).toBeTruthy();
    expect(timeNode.getAttribute('datetime')).toBe(fixed.toISOString());
    expect(timeNode.textContent?.trim().length).toBeGreaterThan(0);
  });

  it('wires the Refresh button with aria attributes and calls refetch on click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /refresh statuses/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-controls', 'last-updated');

    await user.click(button);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('reflects loading state via button aria-busy', () => {
    mockState.isLoading = true;

    render(<Header />);

    const button = screen.getByRole('button', { name: /refresh statuses/i });

    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});

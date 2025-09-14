import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Logo } from './Logo';

describe('Logo', () => {
  it('renders an img with accessible alt text', () => {
    render(<Logo alt="TrackStack" />);
    const img = screen.getByRole('img', { name: /trackstack/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/trackstack-logo.svg');
  });

  it('accepts custom size via className', () => {
    render(<Logo className="h-10 w-auto" alt="TrackStack" />);
    const img = screen.getByRole('img', { name: /trackstack/i });
    expect(img).toHaveClass('h-10', 'w-auto');
  });

  it('uses default alt when not provided', () => {
    render(<Logo />);
    const img = screen.getByRole('img', { name: /trackstack/i });
    expect(img).toBeInTheDocument();
  });
});

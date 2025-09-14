import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />);
    const landmark = screen.getByRole('contentinfo');
    expect(landmark).toBeInTheDocument();
  });

  it('shows expected section headings', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /Attributions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Data &? accuracy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Credits/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Affiliation/i })).toBeInTheDocument();
  });

  it('includes a TfL API external link with accessible name and expected attributes', () => {
    render(<Footer />);

    const link = screen.getByText(/TfL Unified API/i);
    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute('href', 'https://api.tfl.gov.uk/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringMatching(/noopener/));
  });
});

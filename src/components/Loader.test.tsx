import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Loader } from './Loader';

vi.mock('./atoms/Logo.tsx', () => ({
  Logo: ({ className, alt }: { className?: string; alt?: string }) => (
    <div role="img" aria-label={alt} className={className} />
  ),
}));

describe('Loader', () => {
  it('renders with default props (variant: funky, size: md, showText: true)', () => {
    const { container } = render(<Loader />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toBeInTheDocument();

    expect(logo).toHaveClass('h-8', 'w-8'); // md
    expect(logo).toHaveClass('loader-funky');

    const overlay = container.querySelector('.loader-spin.absolute');
    expect(overlay).toBeInTheDocument();
  });

  it('does not render text when showText is false', () => {
    render(<Loader showText={false} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders custom text when provided', () => {
    render(<Loader text="Please wait…" />);
    expect(screen.getByText('Please wait…')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Loader size="sm" />);
    let logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toHaveClass('h-6', 'w-6');

    rerender(<Loader size="md" />);
    logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toHaveClass('h-8', 'w-8');

    rerender(<Loader size="lg" />);
    logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toHaveClass('h-12', 'w-12');

    rerender(<Loader size="xl" />);
    logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toHaveClass('h-16', 'w-16');
  });

  it.each([
    ['simple', 'loader-spin'],
    ['pulse', 'loader-pulse'],
    ['bounce', 'loader-bounce'],
    ['color-shift', 'loader-color-shift'],
    ['wiggle', 'loader-wiggle'],
    ['combo', 'loader-combo'],
    ['funky', 'loader-funky'],
  ] as const)('applies variant class for variant=%s', (variant, expectedClass) => {
    const { container, unmount } = render(<Loader variant={variant} />);
    const logo = screen.getByRole('img', { name: 'Loading' });
    expect(logo).toHaveClass(expectedClass);

    const overlay = container.querySelector('.loader-spin.absolute');
    if (variant === 'funky') {
      expect(overlay).toBeInTheDocument();
    } else {
      expect(overlay).not.toBeInTheDocument();
    }
    unmount();
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(<Loader className="my-extra-class" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('my-extra-class');
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'gap-3');
  });
});

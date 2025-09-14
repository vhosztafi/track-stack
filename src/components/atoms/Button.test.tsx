import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders with default variant and handles clicks', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    const btn = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('respects disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows spinner and aria-busy when loading', () => {
    render(<Button loading>Loading…</Button>);
    const btn = screen.getByRole('button', { name: /loading/i });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn.querySelector('svg')).toBeTruthy();
  });
});

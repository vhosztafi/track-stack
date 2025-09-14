import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeTruthy();
  });

  it('supports accessible label', () => {
    render(<Divider label="Section divider" />);
    const hr = screen.getByRole('separator', { name: /section divider/i });
    expect(hr).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SkipLink from './SkipLink';

test('renders with correct href and label', () => {
  render(<SkipLink targetId="main-content" label="Skip to content" />);
  const link = screen.getByRole('link', { name: /skip to content/i });
  expect(link).toHaveAttribute('href', '#main-content');
});

test('is focusable and visible when focused', async () => {
  const user = userEvent.setup();
  render(
    <>
      <SkipLink targetId="main-content" label="Skip to content" />
      <div id="main-content">Content</div>
    </>
  );
  await user.tab();
  const link = screen.getByRole('link', { name: /skip to content/i });
  expect(link).toHaveFocus();
});

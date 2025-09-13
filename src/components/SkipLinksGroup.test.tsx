import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SkipLinksGroup from './SkipLinksGroup';

describe('SkipLinksGroup', () => {
  const links = [
    { targetId: 'main-content', label: 'Skip to content' },
    { targetId: 'main-nav', label: 'Skip to navigation' },
    { targetId: 'footer', label: 'Skip to footer' },
  ];

  function renderWithTargets() {
    render(
      <>
        <SkipLinksGroup links={links} />
        {/* Mock targets so the anchors are valid */}
        <div id="main-nav">Navigation</div>
        <main id="main-content">Main</main>
        <footer id="footer">Footer</footer>
      </>
    );
  }

  test('renders all links with correct hrefs and labels', () => {
    renderWithTargets();
    const rendered = screen.getAllByRole('link');
    expect(rendered).toHaveLength(3);

    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main-content'
    );

    expect(screen.getByRole('link', { name: /skip to navigation/i })).toHaveAttribute(
      'href',
      '#main-nav'
    );

    expect(screen.getByRole('link', { name: /skip to footer/i })).toHaveAttribute(
      'href',
      '#footer'
    );
  });

  test('tab order follows the provided array order', async () => {
    const user = userEvent.setup();
    renderWithTargets();

    const [first, second, third] = screen.getAllByRole('link');

    await user.tab();
    expect(first).toHaveFocus();

    await user.tab();
    expect(second).toHaveFocus();

    await user.tab();
    expect(third).toHaveFocus();
  });
});

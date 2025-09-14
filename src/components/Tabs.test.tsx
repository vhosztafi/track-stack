import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Tabs from './Tabs';

function getTabs() {
  const list = screen.getByRole('tablist', { name: /tabs/i });
  return within(list).getAllByRole('tab');
}

describe('Tabs (uncontrolled)', () => {
  const items = [
    { id: 'one', label: 'One' },
    { id: 'two', label: 'Two' },
    { id: 'three', label: 'Three' },
  ];

  it('renders a tablist with tabs and selects the first by default', () => {
    render(<Tabs items={items} />);
    const tabs = getTabs();

    expect(tabs).toHaveLength(3);

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');

    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  it('respects defaultValue when provided', () => {
    render(<Tabs items={items} defaultValue="two" />);
    const tabs = getTabs();

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('tabindex', '0');
  });

  it('clicking a tab updates selection and calls onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tabs items={items} onValueChange={onValueChange} />);

    const tabs = getTabs();
    await user.click(tabs[2]);

    expect(onValueChange).toHaveBeenCalledWith('three');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('supports keyboard navigation: ArrowRight/Left, Home/End with roving focus', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    const tabs = getTabs();

    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(tabs[2]).toHaveFocus();
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('falls back to first item if defaultValue is invalid', () => {
    render(<Tabs items={items} defaultValue="missing" />);
    const tabs = getTabs();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('has a default aria-label "Tabs"', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tablist', { name: 'Tabs' })).toBeInTheDocument();
  });
});

describe('Tabs (controlled)', () => {
  const items = [
    { id: 'alpha', label: 'Alpha' },
    { id: 'beta', label: 'Beta' },
  ];

  function ControlledHarness() {
    const [val, setVal] = useState('alpha');
    return <Tabs items={items} value={val} onValueChange={(id) => setVal(id)} />;
  }

  it('reflects the controlled value and changes only via prop updates', async () => {
    const user = userEvent.setup();
    render(<ControlledHarness />);

    let tabs = getTabs();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    await user.click(tabs[1]);

    tabs = getTabs();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Tabs (ARIA labeling)', () => {
  it('allows custom aria-label', () => {
    render(
      <Tabs
        items={[
          { id: 'a', label: 'A' },
          { id: 'b', label: 'B' },
        ]}
        ariaLabel="Choose letter"
      />
    );
    expect(screen.getByRole('tablist', { name: 'Choose letter' })).toBeInTheDocument();
  });
});

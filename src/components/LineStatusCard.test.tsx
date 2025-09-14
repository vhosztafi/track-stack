import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { LineCardVM } from '../types/tfl.ts';
import LineStatusCard from './LineStatusCard';

type SubStatus = { label: string; scope?: string };

function makeItem({
  line = 'Jubilee',
  colourClassName = 'tfl-ink',
  subStatuses = [{ label: 'Good Service' }] as SubStatus[],
  canExpand = true,
  defaultOpen = false,
} = {}): LineCardVM {
  return {
    id: '',
    isGoodService: false,
    line,
    colourClassName,
    subStatuses,
    canExpand,
    defaultOpen,
  };
}

describe('LineStatusCard', () => {
  it('renders heading and sub-status list', () => {
    const item = makeItem({
      line: 'Bakerloo',
      subStatuses: [{ label: 'Minor Delays' }, { label: 'Due to earlier signal failure' }],
    });

    render(<LineStatusCard item={item} />);

    expect(screen.getByRole('heading', { name: 'Bakerloo' })).toBeInTheDocument();

    const lists = screen.getAllByRole('list');
    const headerList = lists[0];
    const items = within(headerList).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(within(items[0]).getByText('Minor Delays')).toBeInTheDocument();
    expect(within(items[1]).getByText('Due to earlier signal failure')).toBeInTheDocument();
  });

  it('toggles aria-expanded and shows the region when expandable', async () => {
    const user = userEvent.setup();
    const item = makeItem({
      line: 'Central',
      subStatuses: [{ label: 'Severe Delays', scope: 'Between Leytonstone and Ealing Broadway' }],
      canExpand: true,
      defaultOpen: false,
    });

    render(<LineStatusCard item={item} />);

    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const regionBefore = screen.queryByRole('region');
    expect(regionBefore).not.toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const regionAfter = screen.getByRole('region');
    expect(regionAfter).toBeInTheDocument();

    const labelledById = regionAfter.getAttribute('aria-labelledby');
    expect(labelledById).toBeTruthy();
    const heading = labelledById ? document.getElementById(labelledById) : null;
    expect(heading).toBeTruthy();
    expect(heading).toHaveTextContent('Central');

    expect(screen.getByText('Between Leytonstone and Ealing Broadway')).toBeInTheDocument();
  });

  it('is disabled and not expandable when canExpand=false', async () => {
    const user = userEvent.setup();

    const item = makeItem({
      line: 'Victoria',
      subStatuses: [{ label: 'Good Service' }],
      canExpand: false,
    });

    render(<LineStatusCard item={item} />);

    const toggle = screen.getByRole('button');
    expect(toggle).toBeDisabled();
    expect(toggle).not.toHaveAttribute('aria-expanded');
    expect(toggle).not.toHaveAttribute('aria-controls');

    await user.click(toggle);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('renders the region open by default when defaultOpen=true and canExpand=true', async () => {
    const line = 'Northern';
    const item = makeItem({
      line,
      subStatuses: [{ label: 'Part Closure', scope: 'No service between Segment A and B' }],
      canExpand: true,
      defaultOpen: true,
    });

    render(<LineStatusCard item={item} />);

    const heading = screen.getByRole('heading', { name: line });
    const toggle = heading.closest('button') as HTMLButtonElement;
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const region = screen.getByRole('region', { name: line });
    expect(region).toBeInTheDocument();
  });
});

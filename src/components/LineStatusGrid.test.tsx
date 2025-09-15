import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { LineCardVM } from '../types/tfl.ts';
import LineStatusGrid from './LineStatusGrid';

type SubStatus = { label: string; scope?: string };
type ItemInit = {
  line: string;
  colourClassName?: string;
  subStatuses?: SubStatus[];
  canExpand?: boolean;
  defaultOpen?: boolean;
  isGoodService?: boolean;
};

function makeItem({
  line,
  colourClassName = 'tfl-ink',
  subStatuses = [{ label: 'Good Service' }],
  canExpand = true,
  defaultOpen = false,
  isGoodService = false,
}: ItemInit): LineCardVM {
  return {
    id: line,
    isGoodService,
    line,
    colourClassName,
    subStatuses,
    canExpand,
    defaultOpen,
  };
}

describe('LineStatusGrid', () => {
  it('renders one card per item with expected headings', () => {
    const items: LineCardVM[] = [
      makeItem({ line: 'Central' }),
      makeItem({ line: 'Victoria' }),
      makeItem({ line: 'Northern' }),
    ];

    render(<LineStatusGrid items={items} />);

    expect(screen.getByRole('heading', { name: 'Central' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Victoria' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Northern' })).toBeInTheDocument();
  });

  it('allows expanding a single card without affecting others', async () => {
    const user = userEvent.setup();
    const items = [
      makeItem({
        line: 'Central',
        subStatuses: [{ label: 'Minor Delays', scope: 'Between A and B' }],
        canExpand: true,
        defaultOpen: false,
      }),
      makeItem({ line: 'Victoria', canExpand: true, defaultOpen: false }),
      makeItem({ line: 'Bakerloo', canExpand: false }),
    ];

    render(<LineStatusGrid items={items} />);

    const centralToggle = await screen.findByRole('button', { name: 'Central' });
    expect(centralToggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(centralToggle);
    expect(centralToggle).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByRole('region', { name: 'Central' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Victoria' })).not.toBeInTheDocument();

    const bakerlooToggle = screen.getByRole('button', { name: 'Bakerloo' });
    expect(bakerlooToggle).toBeDisabled();
  });

  it('supports multiple expandable cards independently', async () => {
    const user = userEvent.setup();
    const items = [
      makeItem({
        line: 'Piccadilly',
        canExpand: true,
        defaultOpen: false,
        isGoodService: false,
        subStatuses: [
          {
            label: 'Part Closure',
            scope: 'Between Acton Town and Heathrow Terminal 5',
          },
        ],
      }),
      makeItem({
        line: 'Jubilee',
        canExpand: true,
        defaultOpen: false,
        isGoodService: false,
        subStatuses: [
          {
            label: 'Part Closure',
            scope: 'Between Acton Town and Heathrow Terminal 5',
          },
        ],
      }),
    ];

    render(<LineStatusGrid items={items} />);

    const piccadillyToggle = screen.getByRole('button', { name: 'Piccadilly' });
    const jubileeToggle = screen.getByRole('button', { name: 'Jubilee' });

    await user.click(piccadillyToggle);
    expect(screen.getByRole('region', { name: 'Piccadilly' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Jubilee' })).not.toBeInTheDocument();

    await user.click(jubileeToggle);
    expect(screen.getByRole('region', { name: 'Piccadilly' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Jubilee' })).toBeInTheDocument();
  });
});

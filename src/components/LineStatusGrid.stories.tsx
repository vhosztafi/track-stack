import type { Meta, StoryObj } from '@storybook/react';

import LineStatusGrid from './LineStatusGrid';

const meta = {
  title: 'Components/LineStatusGrid',
  component: LineStatusGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1200, margin: '1rem auto', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineStatusGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        line: 'Central',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Minor Delays' }, { label: 'Due to earlier signal failure' }],
        canExpand: true,
        defaultOpen: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Victoria',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        defaultOpen: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Northern',
        colourClassName: 'tfl-ink',
        subStatuses: [
          { label: 'Part Closure', scope: 'Part Closure' },
          { label: 'Plan ahead', scope: 'Plan ahead' },
        ],
        canExpand: true,
        defaultOpen: true,
        id: '',
        isGoodService: false,
      },
    ],
  },
};

export const AllActive: Story = {
  name: 'All Active (non-expandable)',
  args: {
    items: [
      {
        line: 'Victoria',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Jubilee',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Metropolitan',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
    ],
  },
};

export const AllPaused: Story = {
  name: 'All Paused (expandable)',
  args: {
    items: [
      {
        line: 'District',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Severe Delays' }, { label: 'Tickets accepted on buses' }],
        canExpand: true,
        defaultOpen: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Bakerloo',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Minor Delays' }],
        canExpand: true,
        defaultOpen: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Hammersmith & City',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Part Closure' }, { label: 'Check before you travel' }],
        canExpand: true,
        defaultOpen: false,
        id: '',
        isGoodService: false,
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      {
        line: 'Central',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Circle',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'District',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Minor Delays' }],
        canExpand: true,
        id: '',
        isGoodService: false,
      },
      {
        line: 'H&C',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Jubilee',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Metropolitan',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Part Closure' }],
        canExpand: true,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Northern',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Piccadilly',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Victoria',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
      {
        line: 'Waterloo & City',
        colourClassName: 'tfl-ink',
        subStatuses: [{ label: 'Good Service' }],
        canExpand: false,
        id: '',
        isGoodService: false,
      },
    ],
  },
};

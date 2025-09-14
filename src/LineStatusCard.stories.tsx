import type { Meta, StoryObj } from '@storybook/react';

import LineStatusCard from './components/LineStatusCard.tsx';

const meta = {
  title: 'Components/LineStatusCard',
  component: LineStatusCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 960, margin: '1rem auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpandableClosed: Story = {
  name: 'Expandable (closed)',
  args: {
    item: {
      line: 'Central',
      colourClassName: 'tfl-ink',
      subStatuses: [{ label: 'Minor Delays' }, { label: 'Due to earlier signal failure' }],
      canExpand: true,
      defaultOpen: false,
      id: '',
      isGoodService: false,
    },
  },
};

export const ExpandableDefaultOpen: Story = {
  name: 'Expandable (default open)',
  args: {
    item: {
      line: 'Northern',
      colourClassName: 'tfl-ink',
      subStatuses: [
        { label: 'Part Closure' },
        { label: 'Some stations closed' },
        { label: 'Plan ahead' },
      ],
      canExpand: true,
      defaultOpen: true,
      id: '',
      isGoodService: false,
    },
  },
};

export const NonExpandable: Story = {
  name: 'Non-expandable',
  args: {
    item: {
      line: 'Victoria',
      colourClassName: 'tfl-ink',
      subStatuses: [{ label: 'Good Service' }],
      canExpand: false,
      defaultOpen: false,
      id: '',
      isGoodService: false,
    },
  },
};

export const ManySubStatuses: Story = {
  name: 'Many sub-statuses',
  args: {
    item: {
      line: 'District',
      colourClassName: 'tfl-ink',
      subStatuses: [
        { label: 'Severe Delays' },
        { label: 'Due to signal failure' },
        { label: 'Tickets valid on local buses' },
        { label: 'Expect crowding' },
      ],
      canExpand: true,
      defaultOpen: false,
      id: '',
      isGoodService: false,
    },
  },
};

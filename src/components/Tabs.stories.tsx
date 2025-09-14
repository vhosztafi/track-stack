import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  args: {
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'activity', label: 'Activity' },
      { id: 'settings', label: 'Settings' },
    ],
    bordered: true,
    fullWidth: false,
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Uncontrolled: Story = {
  name: 'Uncontrolled (with defaultValue)',
  args: {
    defaultValue: 'activity',
  },
};

export const Controlled: Story = {
  name: 'Controlled',
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.items?.[0]?.id);
    return (
      <div style={{ width: 600 }}>
        <Tabs
          {...args}
          value={value}
          onValueChange={(id) => {
            setValue(id);
          }}
        />
        <div style={{ marginTop: 12, fontFamily: 'sans-serif' }}>
          Selected: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 10 }).map((_, i) => ({
      id: `tab-${i + 1}`,
      label: `Tab ${i + 1}`,
    })),
    bordered: true,
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: 800 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const NoBorder: Story = {
  args: {
    bordered: false,
  },
};

export const WithCustomAriaLabel: Story = {
  args: {
    ariaLabel: 'Project sections',
  },
};

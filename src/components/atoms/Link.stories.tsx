import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: { layout: 'padded' },
  args: {
    children: 'Go to Status',
    href: '/status/tube',
  },
  argTypes: {
    external: { control: 'boolean' },
    newTab: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['default', 'subtle'] },
    'aria-current': { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Internal: Story = {};

export const CurrentPage: Story = {
  args: { 'aria-current': 'page' as never },
};

export const External: Story = {
  args: {
    children: 'Plan a journey',
    href: 'https://tfl.gov.uk/plan-a-journey',
    external: true,
  },
};

export const ExternalNewTab: Story = {
  args: {
    children: 'TfL home (new tab)',
    href: 'https://tfl.gov.uk',
    external: true,
    newTab: true,
  },
};

export const Subtle: Story = {
  args: {
    children: 'Subtle link',
    variant: 'subtle',
  },
};

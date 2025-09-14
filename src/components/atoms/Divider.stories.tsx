import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  args: { label: 'Section divider' },
  argTypes: { label: { control: 'text' } },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
export const Unlabeled: Story = { args: { label: undefined } };

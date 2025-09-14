import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  args: { alt: 'TrackStack', className: 'h-10 w-auto' },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
export const Small: Story = { args: { className: 'h-6 w-auto' } };
export const Large: Story = { args: { className: 'h-16 w-auto' } };

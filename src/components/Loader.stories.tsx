import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    docs: {
      description: {
        component:
          'A versatile loading indicator with multiple variants and sizes. Defaults to a playful "funky" animation.',
      },
    },
    a11y: {},
  },
  args: {
    size: 'md',
    variant: 'funky',
    text: 'Loading...',
    showText: true,
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['simple', 'pulse', 'bounce', 'color-shift', 'wiggle', 'combo', 'funky'],
    },
    text: { control: 'text' },
    showText: { control: 'boolean' },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const NoText: Story = {
  args: { showText: false },
};

export const CustomText: Story = {
  args: { text: 'Please wait…' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-10 p-6">
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} size="sm" />
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} size="md" />
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} size="lg" />
        <span className="text-xs text-gray-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} size="xl" />
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
  args: { showText: false },
  parameters: {
    docs: {
      description: { story: 'Preview all size options.' },
    },
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-10 p-6">
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="simple" />
        <span className="text-xs text-gray-500">simple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="pulse" />
        <span className="text-xs text-gray-500">pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="bounce" />
        <span className="text-xs text-gray-500">bounce</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="color-shift" />
        <span className="text-xs text-gray-500">color-shift</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="wiggle" />
        <span className="text-xs text-gray-500">wiggle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="combo" />
        <span className="text-xs text-gray-500">combo</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader {...args} variant="funky" />
        <span className="text-xs text-gray-500">funky</span>
      </div>
    </div>
  ),
  args: { showText: false },
  parameters: {
    docs: {
      description: { story: 'Preview all variant styles.' },
    },
  },
};

export const CenteredPlayground: Story = {
  args: {
    size: 'lg',
    variant: 'funky',
    showText: true,
    text: 'Loading data…',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: { story: 'Interactive playground with sensible defaults.' },
    },
  },
};

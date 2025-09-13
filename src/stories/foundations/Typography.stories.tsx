import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  args: { weight: 400, leading: 'normal', size: 'base' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] },
    weight: { control: 'select', options: [300, 400, 500, 600] },
    leading: {
      control: 'select',
      options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
    },
  },
};
export default meta;

type Story = StoryObj<{ size: string; weight: number; leading: string }>;

export const Specimen: Story = {
  render: ({ size, weight, leading }) => (
    <div className="space-y-6 font-sans text-tfl-ink">
      <div className={`text-4xl font-${weight} leading-${leading}`}>H1 / TrackStack</div>
      <div className={`text-3xl font-${weight} leading-${leading}`}>H2 / TrackStack</div>
      <div className={`text-2xl font-${weight} leading-${leading}`}>H3 / TrackStack</div>
      <div className={`text-xl font-${weight} leading-${leading}`}>H4 / TrackStack</div>
      <p className={`text-${size} font-${weight} leading-${leading}`}>
        Body copy specimen with numerals 0123456789.
      </p>
      <code className="font-mono text-sm">Monospace: GET /Status/Tube</code>
    </div>
  ),
};

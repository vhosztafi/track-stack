import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = { title: 'Foundations/Spacing' };
export default meta;

const widths: Record<string, string> = {
  '1': 'w-1',
  '1.5': 'w-1.5',
  '2': 'w-2',
  '2.5': 'w-2.5',
  '3': 'w-3',
  '4': 'w-4',
  '5': 'w-5',
  '6': 'w-6',
  '8': 'w-8',
  '10': 'w-10',
};

export const Scale: StoryObj = {
  render: () => {
    const steps = ['1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10'];
    return (
      <div className="grid grid-cols-1 gap-4">
        {steps.map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`red-500 inline-block h-4 bg-blue-800 ${widths[s]}`} />
            <code>spacing: {s}</code>
          </div>
        ))}
      </div>
    );
  },
};

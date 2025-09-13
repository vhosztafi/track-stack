import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = { title: 'Foundations/FocusStyles' };
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <a href="#" className="underline">
        Focusable link
      </a>
      <button className="rounded border px-3 py-2">Focusable button</button>
      <input className="rounded border px-3 py-2" placeholder="Focusable input" />
      <a href="#main-content" className="skip-to-link">
        Skip to content
      </a>
    </div>
  ),
};

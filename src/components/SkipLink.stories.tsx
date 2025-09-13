import type { Meta, StoryObj } from '@storybook/react';

import SkipLink from './SkipLink.tsx';
import SkipLinksGroup from './SkipLinksGroup.tsx';

const meta = {
  title: 'A11y/SkipLink',
  component: SkipLink,
  args: {
    targetId: 'main-content',
    label: 'Skip to content',
  },
  parameters: {
    a11y: { disable: false },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Group: Story = {
  render: () => (
    <>
      <SkipLinksGroup
        links={[
          { targetId: 'main-content', label: 'Skip to content' },
          { targetId: 'main-nav', label: 'Skip to navigation' },
          { targetId: 'footer', label: 'Skip to footer' },
        ]}
      />
      <div id="main-nav" className="p-4">
        Navigation region
      </div>
      <main id="main-content" className="my-20 p-4">
        Main content region
      </main>
      <footer id="footer" className="p-4">
        Footer region
      </footer>
    </>
  ),
};

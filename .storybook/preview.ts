import type { Preview } from '@storybook/react-vite';
import { initialize, mswDecorator } from 'msw-storybook-addon';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    initialize: initialize({ onUnhandledRequest: 'bypass' }),
    decorators: [mswDecorator],

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;

/// <reference types="vitest/config" />
/// <reference types="vitest" />
// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['msw', 'msw/node', 'msw/browser'],
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        '**/*.d.ts',
        'src/stories/**',
        'src/test/**',
        '.storybook/**',
        '**/*.{config,conf}.{ts,js}',
        '**/Notes/**',
        'src/types/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/test/setupTests.ts',
          css: true,
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['node_modules/**', 'src/stories/**', '.storybook/**'],
        },
      },
      {
        plugins: [
          (await import('@storybook/addon-vitest/vitest-plugin')).storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});

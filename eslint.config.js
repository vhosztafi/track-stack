import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'jsx-a11y': jsxA11y,
      tailwindcss: tailwind,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
      'react/prop-types': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'import/namespace': 'off',
    },
  },
  prettier,
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    files: ['./*.{js,ts}', './.storybook/**/*.{js,ts}'],
    rules: { '@typescript-eslint/no-var-requires': 'off' },
    ignores: ['node_modules', 'dist', 'build', 'coverage', 'storybook-static', 'Notes'],
  },
]);

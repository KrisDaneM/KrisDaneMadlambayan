import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'script.js'] },
  js.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['api/**/*.js'],
    languageOptions: { ecmaVersion: 2020, globals: globals.node, parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser, parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' } },
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^(motion|Icon|[A-Z_])', argsIgnorePattern: '^[A-Z_]' }] },
  },
];

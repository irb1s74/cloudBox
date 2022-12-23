module.exports = {
  env: {
    'browser': true,
    'es2021': true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [{
    files: '**/src/**/*.test.{ts,tsx}',
  }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'camelcase': 'error',
    'spaced-comment': 'error',
    'quotes': ['error', 'single'],
    'no-duplicate-imports': 'error',
  },
  globals: {
    __IS_DEV__: true,
  },
}

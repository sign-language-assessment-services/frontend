module.exports = {
  extends: [
    'prettier', // Prettier: an opinionated code formatter (https://prettier.io/)
    'plugin:@typescript-eslint/recommended', // enables ESLint to support TypeScript
    'plugin:react/recommended', // React specific linting rules for ESLint
  ],

  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    react: {
      version: 'detect', // Detect React version automatically
    },
  },
}

const prettierOptions = require('./.prettierrc');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
};

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-console': IS_PRODUCTION ? RULES.ERROR : RULES.WARNING,
    'no-debugger': IS_PRODUCTION ? RULES.ERROR : RULES.WARNING,
    'prettier/prettier': [
      IS_PRODUCTION ? RULES.ERROR : RULES.WARNING,
      prettierOptions,
    ],
  },
  extends: ['react-app', 'prettier'],
};

const prettierOptions = require('./.prettierrc');

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
    'no-console': RULES.WARNING,
    'no-debugger': RULES.ERROR,
    'prettier/prettier': [RULES.ERROR, prettierOptions],
  },
  extends: ['react-app', 'prettier'],
};

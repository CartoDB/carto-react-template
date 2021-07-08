module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['react-app', 'prettier', 'prettier/react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  /*
  "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "warn"
    }
  */
};

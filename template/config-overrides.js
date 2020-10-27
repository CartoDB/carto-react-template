/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
  const newConfig = config;

  newConfig.resolve.alias = {
    ...newConfig.resolve.alias,
    react: path.resolve('./node_modules/react'),
    '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
  };

  return newConfig;
};

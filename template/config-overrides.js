/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
  const newConfig = config;

  newConfig.resolve.alias.react = path.resolve('./node_modules/react');

  return newConfig;
};

const {resolve} = require('path');

const LOCAL_LINK_ALIASES = {
  '@carto/airship': resolve("../../../../deck.gl/node_modules/@luma.gl/constants")
}

module.exports = (config) => env => {
  config.resolve = config.resolve || {}
  config.resolve.alias = Object.assign({}, LOCAL_LINK_ALIASES, config.resolve.alias || {});

  return config;
};
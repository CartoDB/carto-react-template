/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
  const newConfig = config;

  newConfig.resolve.alias = {
    ...newConfig.resolve.alias,
    react: path.resolve('./node_modules/react'),
    'react-redux': path.resolve('./node_modules/react-redux'),
    '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
    '@deck.gl/core': path.resolve('./node_modules/@deck.gl/core'),
    '@deck.gl/google-maps': path.resolve('./node_modules/@deck.gl/google-maps'),
    '@deck.gl/extensions': path.resolve('./node_modules/@deck.gl/extensions'),

    '@carto/react/api': path.resolve('./node_modules/@carto/react'),
    '@carto/react/basemaps': path.resolve('./node_modules/@carto/react'),
    '@carto/react/oauth': path.resolve('./node_modules/@carto/react'),
    '@carto/react/redux': path.resolve('./node_modules/@carto/react'),
    '@carto/react/ui': path.resolve('./node_modules/@carto/react'),
    '@carto/react/widgets': path.resolve('./node_modules/@carto/react'),
  };

  return newConfig;
};

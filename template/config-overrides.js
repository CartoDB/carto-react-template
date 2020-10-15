const { aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = function override(config) {
  aliasDangerous({
    '@carto/airship-api': '../../airship/packages/api',
  })(config);

  return config;
};

const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@carto/airship': '../../airship',
  })(config);

  return config;
};

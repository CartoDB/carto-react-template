const path = require('path');

module.exports = {
  webpack: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-redux': path.resolve('./node_modules/react-redux'),
      '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
      '@deck.gl/core': path.resolve('./node_modules/@deck.gl/core'),
      '@deck.gl/google-maps': path.resolve('./node_modules/@deck.gl/google-maps'),
      '@deck.gl/extensions': path.resolve('./node_modules/@deck.gl/extensions'),
      '@nebula.gl/edit-modes': path.resolve('./node_modules/@nebula.gl/edit-modes'),
      '@nebula.gl/layers': path.resolve('./node_modules/@nebula.gl/layers'),
    },
  },
};

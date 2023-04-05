/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

/**
 * Adapted from cloud-native craco.config
 */
const localModuleOverridesForLinkedProjects = [
  '@deck.gl',
  '@emotion',
  '@loaders.gl',
  '@luma.gl',
  '@mui',
  '@nebula.gl',
  'react',
  'react-dom',
  'react-redux',
];

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix problem with relative imports outside of `src`
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      // Fix imports with .mjs files in node_modules
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.m?jsx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ];

      // Ignore warnings for source maps in node_modules deps
      webpackConfig.ignoreWarnings = [
        (warning) => {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ];

      return webpackConfig;
    },
    // create entries like below items in localModuleOverridesForLinkedProjects
    // '@loaders.gl': path.resolve(__dirname, 'node_modules/@loaders.gl'),
    alias: localModuleOverridesForLinkedProjects.reduce((r, module) => {
      r[module] = path.resolve(__dirname, `node_modules/${module}`);
      return r;
    }, {}),
  },
  jest: {
    configure: (jestConfig) => {
      return {
        ...jestConfig,
        // for each module from localModuleOverridesForLinkedProjects, create entry like this
        //   '^react-redux$': '<rootDir>/node_modules/react-redux',
        //   '^react-redux/(.*)$': '<rootDir>/node_modules/react-redux/$1',
        moduleNameMapper: localModuleOverridesForLinkedProjects.reduce(
          (r, module) => {
            r[`^${module}$`] = `<rootDir>/node_modules/${module}`;
            r[`^${module}/(.*)$`] = `<rootDir>/node_modules/${module}/$1`;
            return r;
          },
          { ...jestConfig.moduleNameMapper },
        ),
      };
    },
  },
};

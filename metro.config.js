const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    '@octokit/core': require.resolve('@octokit/core'),
    '@octokit/plugin-retry': require.resolve('@octokit/plugin-retry'),
  },
};

config.resolver.blockList = [/(.*.test.tsx?)$/];

module.exports = withNativeWind(config, { input: './global.css' });

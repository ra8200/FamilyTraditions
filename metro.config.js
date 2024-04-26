const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts = config.resolver.sourceExts || [];
config.resolver.sourceExts.push('cjs', 'jsx');

module.exports = config;

// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// if (!defaultConfig.resolver.sourceExts.includes('jsx')) {
//   defaultConfig.resolver.sourceExts.push('jsx');
// }

// module.exports = {
//   ...defaultConfig,
//   transformer: {
//     ...defaultConfig.transformer,
//   },
//   resolver: {
//     ...defaultConfig.resolver,
//   },
// };


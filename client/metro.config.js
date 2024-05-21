const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (async () => {
//     const defaultConfig = await getDefaultConfig(__dirname);

//     defaultConfig.resolver.assetExts.push('ts', 'tsx', 'js', 'jsx', 'json');

//     return defaultConfig;
// })();

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
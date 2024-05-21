const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);

    defaultConfig.resolver.assetExts.push('ts', 'tsx', 'js', 'jsx', 'json');

    return defaultConfig;
})();

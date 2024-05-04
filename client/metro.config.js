const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts = config.resolver.sourceExts || [];
config.resolver.sourceExts.push('cjs', 'jsx');

module.exports = config;
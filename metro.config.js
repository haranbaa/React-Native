const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Load the default config
const defaultConfig = getDefaultConfig(__dirname);

// Merge in our custom config
module.exports = mergeConfig(defaultConfig, {
  entryFile: 'index.tsx', // <-- Force Metro to start at index.tsx

  // Optionally, ensure 'ts' and 'tsx' are in the list of sourceExts
  resolver: {
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'ts',
      'tsx',
    ],
  },
});

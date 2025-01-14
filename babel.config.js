module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ], ['react-native-paper/babel'],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    'react-native-reanimated/plugin',
  ],
};

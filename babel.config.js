module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
    ],
  ],
};

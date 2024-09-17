module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          alias: {
            '@/components': './app/components',
            '@/constants': './app/constants',
            '@/hooks': './app/hooks',
            '@/screen': './app/Screen',
            '@/visa': './app/Vcreen',
          },
        },
      ],
    ],
  };
};


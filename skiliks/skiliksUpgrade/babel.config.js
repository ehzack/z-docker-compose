module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['.'],
        alias: {
          appStyle: './native-base-theme',
          module: './src/modules',
          view: './src/view',
          config: './src/config',
          sercurity: './src/sercurity',
          i18n: './src/i18n',
          navigation: './src/navigation',
        },
        exclude: [/node_modules/],
      },
    ],
  ],
};

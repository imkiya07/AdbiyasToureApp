const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const {withNativeWind} = require('nativewind/metro');

const {withSentryConfig} = require('@sentry/react-native/metro');

const {withSentryConfig} = require('@sentry/react-native/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = withSentryConfig(
  withSentryConfig(
    wrapWithReanimatedMetroConfig(
      withNativeWind(mergeConfig(getDefaultConfig(__dirname), config), {
        input: './src/styles/global.css',
      }),
    ),
  ),
);

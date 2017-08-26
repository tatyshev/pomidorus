/* eslint import/no-extraneous-dependencies: "off" */

const webpackConfig = require('./build/webpack.test.conf');

module.exports = (config) => {
  config.set({
    browsers: ['jsdom'],
    frameworks: ['jasmine'],
    files: [
      'src/config/jasmine.js',
      'src/**/*.spec.js',
    ],
    reporters: ['spec', 'kjhtml'],
    preprocessors: {
      'src/config/*.js': ['webpack', 'sourcemap'],
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true,
    },
  });
};

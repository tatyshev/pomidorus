/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: 'src/index.js',
  sourceMap: isProd ? false : 'eval-source-map',
  homepage: '',
  karma: {
    frameworks: ['jasmine'],
    browsers: ['jsdom'],
    reporters: ['spec', 'kjhtml'],
    proxies: {},
  },
  presets: [
    require('poi-preset-karma')({
      files: ['./karma.js'],
    }),
  ],
};

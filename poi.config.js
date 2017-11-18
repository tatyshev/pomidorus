/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

module.exports = {
  entry: 'src/index.js',
  karma: {
    frameworks: ['jasmine'],
    browsers: ['jsdom'],
    reporters: ['spec', 'kjhtml'],
    proxies: {},
  },
  presets: [
    require('poi-preset-karma')({
      files: [
        './node_modules/given2/jasmine.js',
        './karma.js',
      ],
    }),
  ],
};

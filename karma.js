/* eslint-disable import/no-extraneous-dependencies */

const specContext = require.context('@', true, /\.spec.js$/);
specContext.keys().forEach(specContext);

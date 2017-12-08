/* eslint-disable import/no-extraneous-dependencies */

window.global = require('given2');

const specContext = require.context('@', true, /\.spec.js$/);
specContext.keys().forEach(specContext);

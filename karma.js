const specContext = require.context('@', true, /\.spec.js$/);
specContext.keys().forEach(specContext);

require('babel-polyfill');  // For Symbol support

var testContext = require.context('./js', true, /\.test\.js$/);
testContext.keys().forEach(testContext);

const localsettings = require('./localsettings')();
const process = require('process');

const isTestOnly = 'TEST_ONLY' in process.env;
const isWebpackDevServer = 'WEBPACK_DEV_SERVER' in process.env;

// TODO(mike): make this immutable.
var buildsettings = null;

if (isTestOnly) {  // When run on CI test server
  buildsettings = {
    CLIENT_HOST: 'https://example.org',
    CLIENT_JS_PACKAGE_PATH: '/example-bundle.js',
    SERVER_HOST: 'https://example.org',
  };
} else if (isWebpackDevServer) {  // When built for using webpack dev server
  buildsettings = {
    CLIENT_HOST: localsettings.WEBPACK_DEV_SERVER_HOST,
    CLIENT_JS_PACKAGE_PATH: localsettings.WEBPACK_DEV_SERVER_JS_BUNDLE_PATH,
    SERVER_HOST: localsettings.SERVER_HOST,
  };
} else {  // When built for prod/normal use
  buildsettings = {
    CLIENT_HOST: localsettings.CLIENT_HOST,
    CLIENT_JS_PACKAGE_PATH: localsettings.CLIENT_JS_BUNDLE_PATH,
    SERVER_HOST: localsettings.SERVER_HOST,
  };
}

module.exports = buildsettings;

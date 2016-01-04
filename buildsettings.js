const localsettings = require('./localsettings')();
const process = require('process');

const isWebpackDevServer = "WEBPACK_DEV_SERVER" in process.env;

module.exports = {
  CLIENT_HOST: isWebpackDevServer ? localsettings.WEBPACK_DEV_SERVER_HOST : localsettings.CLIENT_HOST,
  CLIENT_JS_PACKAGE_PATH: isWebpackDevServer ? localsettings.WEBPACK_DEV_SERVER_JS_BUNDLE_PATH : localsettings.WEBPACK_DEV_SERVER_JS_BUNDLE_PATH,
  SERVER_HOST: localsettings.SERVER_HOST
};
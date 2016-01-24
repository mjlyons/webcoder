const settings = require('./settings')();
const isWebpackDevServer = 'WEBPACK_DEV_SERVER' in process.env;

module.exports = {
  CLIENT_HOST: isWebpackDevServer ? settings.WEBPACK_DEV_SERVER_HOST : settings.CLIENT_HOST,
  CLIENT_JS_PACKAGE_PATH: isWebpackDevServer ? settings.WEBPACK_DEV_SERVER_JS_BUNDLE_PATH : settings.CLIENT_JS_BUNDLE_PATH,
  SERVER_HOST: settings.SERVER_HOST,
};

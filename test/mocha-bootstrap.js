/**
 * This allows mocha to use paths relative to rootDir
 */
const path = require('path');
require('app-module-path').addPath(path.resolve());

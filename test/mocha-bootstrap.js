/**
 * This allows mocha to use paths relative to rootDir
 */
const path = require('path');
require('app-module-path').addPath(path.resolve());

const jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

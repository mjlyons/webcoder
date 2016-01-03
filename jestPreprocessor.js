var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');
var path = require('path');

var jsDir = path.resolve(__dirname, './js');

function matches(filename) {
  return filename.indexOf(jsDir) !== -1;
}

module.exports = {
  process: function (src, filename) {
    if (filename.indexOf("node_modules") !== -1) {  // Pass-through external modules
      return src;
    } else if (filename.toLowerCase().endsWith('.scss')) {  //  Ignore scss files
      return '';
    } else if (matches(filename)) {  // Process local es6 code
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};

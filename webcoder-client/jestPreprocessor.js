var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');
var path = require('path');

var jsDir = path.resolve(__dirname, './js');

function matches(filename) {
  return filename.indexOf(jsDir) !== -1;
}

module.exports = {
  process: function (src, filename) {
    var stage = process.env.BABEL_JEST_STAGE || 2;
    if (filename.indexOf("node_modules") !== -1) {
      return src;
    } else if (filename.toLowerCase().endsWith('.scss')) {
      return '';
    } else if (matches(filename)) {
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};

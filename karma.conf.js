var path = require('path');

module.exports = function(config) {
  config.set({
    singleRun: true,
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test-context.js', watched: false }
    ],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    preprocessors: {
      'test-context.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: __dirname
      },
      module: {
        loaders: [
          { test: /\.scss$/, exclude: /node_modules/, loader: 'ignore-loader' },
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test-context.js', watched: false },
      { pattern: 'js/**/*.js', included: false, served: false }
    ],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    preprocessors: {
      'js/**/*.js': ['eslint'],
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
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
  });
};

var path = require('path');

module.exports = function(config) {
  config.set({
    singleRun: true,
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test-context.js', watched: false }
    ],
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
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
          { test: /\.test.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /^((?!\.test\.js).)*$/, exclude: /node_modules|test-context.js|\.scss/, loader: 'isparta' },
          { test: /\.scss$/, exclude: /node_modules/, loader: 'ignore-loader' },
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text', subdir: '.', file: 'report.txt' },
      ],
    }
  });
};

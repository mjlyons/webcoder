const HtmlWebpackPlugin = require('html-webpack-plugin');
const localsettings = require('./localsettings')();
const path = require('path');

module.exports = {
  entry: "./js/client/client.js",
  output: {
    path: path.join(__dirname, 'build/static/client'),
    filename: "bundle.js"
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.scss'],
    alias: {
      js: 'js',
      style: 'style',
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',  // 'babel-loader' is also a legal name to reference
        query: { presets: ['es2015', 'react'] }
      }, {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/html/client.html',
      localsettings: localsettings
    }),
  ],
}

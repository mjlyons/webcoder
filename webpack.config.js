const buildsettings = require('./buildsettings');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const settings = require('./settings')();
const path = require('path');

const clientJsPackageUrl = buildsettings.CLIENT_HOST + buildsettings.CLIENT_JS_PACKAGE_PATH;

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
      filename: 'client.html',
      template: 'client/html/client.html',
      settings: settings,
      CLIENT_JS_PACKAGE_URL: clientJsPackageUrl
    }),
  ],
}

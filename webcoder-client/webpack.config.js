const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: "./js/index.js",
  output: {
    path: path.join(__dirname, 'build'),
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
      template: 'html/index.html',
    }),
  ],
}

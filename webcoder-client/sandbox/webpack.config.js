module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "build/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',  // 'babel-loader' is also a legal name to reference
        query: { presets: ['react'] }
      }
    ]
  }
}

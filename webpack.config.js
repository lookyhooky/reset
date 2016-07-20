const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',

  output: {
    path: './public',
    filename: 'main.bundle.js'
  },

  devtool: 'source-map',

  // module: {
  //   loaders: [{
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     loader: 'babel-loader'
  //   }]
  // },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}

const webpack = require('webpack')

const postcssCalc = require('postcss-calc')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssReporter = require('postcss-reporter')
const postcssRemoveRoot = require('postcss-remove-root')
const postcssCustomMedia = require('postcss-custom-media')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssDiscardComments = require('postcss-discard-comments')

module.exports = {
  entry: {
    main: './src/main.js'
  },

  output: {
    path: './public',
    filename: '[name].js'
  },

  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],

  postcss: function () {
    return [postcssImport({addDependencyTo: webpack}),
            postcssCustomMedia,
            postcssCustomProperties,
            postcssCalc,
            postcssDiscardComments,
            postcssRemoveRoot,
            autoprefixer,
            postcssReporter]
  }
}

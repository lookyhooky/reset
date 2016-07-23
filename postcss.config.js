// var postcss = require('postcss')
module.exports = {
  use: [
    'postcss-import',
    'postcss-custom-media',
    'postcss-custom-properties',
    'postcss-color-function',
    'postcss-calc',
    'postcss-discard-comments',
    'postcss-remove-root',
    'autoprefixer',
    'postcss-reporter'
  ],
  input: 'css/style.css',
  dir: 'public'
}

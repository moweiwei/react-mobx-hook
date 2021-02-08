const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
})

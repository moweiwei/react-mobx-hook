const { resolve } = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const root = (path) => resolve(__dirname, `../${path}`)

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    path: root('dist/'),
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [...baseConfig.module.rules],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888, // 端口号设置
    }),
  ],
}

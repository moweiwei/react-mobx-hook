const webpack = require('webpack')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const proxys = require('./proxys.js')

const root = (path) => resolve(__dirname, `../${path}`)

module.exports = merge(common, {
  devtool: 'eval-source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/',
    pathinfo: false,
  },
  devServer: {
    contentBase: root('public'),
    host: '127.0.0.1', // 指定 host，不设置的话默认是 localhost
    port: 3000, // 指定端口，默认是8080
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    proxy: { ...proxys },
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

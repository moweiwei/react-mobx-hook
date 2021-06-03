const webpack = require('webpack')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const proxys = require('./proxys.js')

const root = (path) => resolve(__dirname, `../${path}`)

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    app: ['./src/index.tsx'],
  },
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        include: root('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                // minimize: false,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.less$/i,
        include: root('node_modules'),
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // minimize: false,
                importLoaders: 2,
              },
            },
          },
        ],
      },
    ],
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

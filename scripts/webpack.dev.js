const webpack = require('webpack')
const { resolve } = require('path')
const baseConfig = require('./webpack.base.js')
const proxys = require('./proxys.js')

const root = (path) => resolve(__dirname, `../${path}`)

module.exports = {
  mode: 'development',
  entry: baseConfig.entry,
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.((c|le)ss)$/i,
        include: root('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.((c|le)ss)$/i,
        include: root('node_modules'),
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: baseConfig.resolve,
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [root('node_modules'), root('dist')],
    }),
  ],
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
}

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // 端口号
    port: '3000',
    inline: true,
    hot: true, // 允许热加载
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'), // 这里必须要解析成字符串进行判断，不然将会被识别为一个变量
    }),
  ],
})

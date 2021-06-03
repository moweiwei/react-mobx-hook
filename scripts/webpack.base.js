const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const root = (path) => resolve(__dirname, `../${path}`)
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: root('src'),
      pages: root('src/pages'),
      components: root('src/components'),
      'react-dom': '@hot-loader/react-dom',
      stores: root('src/stores'),
      less: root('src/less'),
      utils: root('src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[local]__[hash:base64:5]',
      //         },
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ],
      // },
      // {
      //   test: /\.less$/i,
      //   use: [
      //     {
      //       loader: 'style-loader', // 从 JS 中创建样式节点
      //     },
      //     {
      //       loader: 'css-loader', // 转化 CSS 为 CommonJS
      //     },
      //     {
      //       loader: 'less-loader', // 编译 Less 为 CSS
      //     },
      //   ],
      // },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(a?png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src/assets/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: root('src/assets'),
          from: '*',
          to: root('dist'),
          toType: 'dir',
        },
      ],
    }),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: root('tsconfig.json'),
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
}

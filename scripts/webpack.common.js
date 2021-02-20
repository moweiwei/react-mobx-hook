const { resolve } = require('path')
const { PROJECT_PATH, isDev } = require('./constants')

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: resolve(PROJECT_PATH, './src'),
      app: resolve(PROJECT_PATH, './src/app'),
      components: resolve(PROJECT_PATH, './src/app/components'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // css
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // less
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader', // 从 JS 中创建样式节点
          },
          {
            loader: 'css-loader', // 转化 CSS 为 CommonJS
          },
          {
            loader: 'less-loader', // 编译 Less 为 CSS
          },
        ],
      },
      // static assets
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
      template: resolve(PROJECT_PATH, './src/assets/index.html'),
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
          context: resolve(PROJECT_PATH, './src/assets'),
          from: '*',
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
        },
      ],
    }),
    new WebpackBar({
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json'),
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

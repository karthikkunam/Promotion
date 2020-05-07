const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = '../dist/web';

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    // 'webpack-hot-middleware/client',
    // 'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/only-dev-server',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, `${outputDirectory}/client`),
    filename: 'bundle.js',
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts(x?)$/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/env', {
                  targets: {
                    node: '12.13.0'
                  }
                }]
              ],
              plugins: [],
              compact: false,
              babelrc: false
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(\?.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?.+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.eot(\?.+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.otf(\?.+)?$/,
        use: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimize: true,
    namedModules: true
  },
  devServer: {
    contentBase: path.join(__dirname, '../src/client'),
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://[::1]:5000',
        changeOrigin: true
      }
    },
    inline: true,
    liveReload: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      favicon: './src/public/favicon.ico'
    })
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
};

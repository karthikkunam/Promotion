const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = '../dist/web';

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, `${outputDirectory}/client`),
    filename: 'bundle.js',
    publicPath: '/'
  },
  watch: false,
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
    contentBase: path.join(__dirname, `${outputDirectory}/client`),
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      favicon: './src/public/favicon.ico'
    })
  ],
  // externals: [nodeExternals()],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
};

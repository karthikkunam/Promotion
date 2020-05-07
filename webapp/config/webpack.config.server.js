const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = '../dist/web';

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  entry: ['babel-polyfill', '../src/server/server.js'],
  output: {
    path: path.join(__dirname, `${outputDirectory}/server`),
    filename: 'server.js',
    publicPath: '/'
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env']],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties']
              ],
              compact: false,
              babelrc: false
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env', { targets: { node: '8.10' } }]],
              plugins: [],
              compact: false,
              babelrc: false
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: false,
    namedModules: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../.env.build'),
        to: path.resolve(__dirname, `${outputDirectory}/server/.env`),
        toType: 'file',
        force: true
      },
      {
        from: path.resolve(__dirname, '../db.json'),
        to: path.resolve(__dirname, `${outputDirectory}/server/db.json`),
        toType: 'file',
        force: true
      }
    ])
  ],
  externals: [nodeExternals()],
  target: 'node',
  node: {
    // Allow these globals.
    __filename: false,
    __dirname: false
  },
  stats: 'errors-only',
  bail: true,
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
};

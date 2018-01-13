const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');

module.exports = {
  // entry: ['babel-polyfill', SRC_DIR + '/index.js'],
  entry: SRC_DIR + '/page/index.js',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'highlight-we.page.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        },
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
};

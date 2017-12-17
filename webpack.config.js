const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  // entry: ['babel-polyfill', SRC_DIR + '/index.js'],
  entry: SRC_DIR + '/index.js',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'highlight-we.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  }
};

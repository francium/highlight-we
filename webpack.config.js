const path = require('path');

module.exports = {
  entry: './src/highlighter.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets:
            [["env", {
              "targets": {
                "browsers": ["last 5 versions"]
              }
            }]]
        }
      }
    ]
  }
};

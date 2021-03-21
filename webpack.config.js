const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js', // string
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    port: 8080
  }
};

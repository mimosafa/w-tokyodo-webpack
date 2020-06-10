const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: outputPath
  },

  devServer: {
    contentBase: outputPath,
    open: true,
    watchContentBase: true
  }
}

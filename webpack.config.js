const mode = 'development';

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: mode,

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: outputPath
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],

  devServer: {
    contentBase: outputPath,
    open: true,
    watchContentBase: true
  }
}

const mode = 'development';
const enabledSourceMap = (mode === 'development');

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

  devtool: enabledSourceMap ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          }
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

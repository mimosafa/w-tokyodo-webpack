const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
const enabledSourceMap = (mode === 'development');

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: mode,

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: outputPath
  },

  devtool: enabledSourceMap ? 'source-map' : false,

  resolve: {
    alias: {
      '@wstd': path.resolve(__dirname, 'src/js/modules')
    }
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: enabledSourceMap,
              url: true,
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 10,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  devServer: {
    contentBase: outputPath,
    open: true,
    watchContentBase: true
  }
}

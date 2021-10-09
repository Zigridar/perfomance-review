const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

/** Webpack config **/
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.tsx'
  },
  stats: {
    children: true
  },
  devServer: {
    port: 3000,
    proxy: {
      context: () => true,
      target: 'http://localhost:8080'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/front')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new TerserWebpackPlugin(),
    new FaviconsWebpackPlugin(path.resolve(__dirname, './src/img/favicon.png'))
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpeg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
};
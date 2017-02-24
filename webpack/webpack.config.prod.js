const { resolve } = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
const cfg = require('./webpack.config.js');

module.exports = {
  entry: {
    bundle: resolve(__dirname, '../src'),
    vendor: [
      // 'react',
      // 'react-dom',
      'redux',
      'react-redux',
      'recompose',
      '@blueprintjs/core',
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  context: resolve(__dirname, '../src'),

  module: cfg.module,
  plugins: cfg.plugins,
};

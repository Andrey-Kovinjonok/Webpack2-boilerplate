const { resolve } = require('path');

const cfg = require('./webpack.config.js');

const isVerbose = false;

const PORT = 3019;

// console.log('__dirname =', __dirname);

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/only-dev-server',
      resolve(__dirname, 'hotReload'),
    ],
    /*vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'recompose',
      '@blueprintjs/core',
    ],*/
  },
  output: {
    path: resolve(__dirname),
    publicPath: '/',
    filename: '[hash].[name].js',
    sourceMapFilename: '[file].map',
  },
  context: resolve(__dirname, '../src'),
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-source-map',
  // devtool: 'cheap-module-eval-source-map',

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: PORT,
    contentBase: resolve(__dirname, '../assets'),
    publicPath: '/',
    historyApiFallback: true,
  },

  stats: {
    colors: true,
    reasons: true,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  module: cfg.module,
  plugins: cfg.plugins,

  performance: { hints: false },
};

/*
https://github.com/jaredlunde/webpack2-react-es7-boilerplate/blob/master/webpack.config.js
*/

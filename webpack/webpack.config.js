const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const OfflinePlugin = require('offline-plugin');

const isProd = process.env.NODE_ENV === 'production';


module.exports = {
  module: {
    rules: [
      /*
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/],
      }, */
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src'), resolve(__dirname)],
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!stylus?sourceMap')
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader',
        // }),
        // use: ['style-loader', 'css-loader'],
        use: [
          /*
          {
            loader: 'style-loader',
            // query: { plugins: [] },
          },*/
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
              // importLoaders: true,
              // modules: true,
              // localIdentName: '[name]_[local]_[hash:base64:3]', // dev
              // localIdentName:  '[hash:base64:4]', // prod
              // localIdentName: '[name]_[local]_[hash:base64:3]', // dev
              // plugins: [],
            },
          }, {
            loader: 'postcss-loader',
            options: {
              // config: './postcss.config.js',
            },
          },
        ],
      }, {
        test: /\.styl$/,
        // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!stylus?sourceMap')
        // use: ['style-loader', 'css-loader', 'stylus-loader'],
        use: [{
          loader: 'style-loader',
          // query: { plugins: [] },
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
            modules: true,
            // localIdentName:  '[hash:base64:4]', // prod
            // localIdentName:  '[path][name]–––[local]–––[hash:base64:5]', // prod
            localIdentName: '[name]_[local]_[hash:base64:3]', // dev
            // plugins: [],
          },
        }, {
          loader: 'postcss-loader',
          options: {
            // config: './postcss.config.js',
          },
          /*
          query: {
            plugins: () => ([
              require('autoprefixer')({
                browsers: ['last 2 versions', 'ie > 8'],
              }),
            ]),
            // If you disable the style-loader
            // the below will work but styles
            // will not actually be compiled
            // plugins: [
            //     require('autoprefixer')({
            //         browsers: ['last 2 versions', 'ie > 8'],
            //     }),
            // ],
          },*/
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: true,
            // plugins: [],
          },
        }],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        options: {
          // limit: 8192,
        },
      },
      // postcss: () => {
      //   return [ autoprefixer({browsers: ['last 2 versions']}) ];
      // },
    ],
  },

  plugins: [
    // !isProd &&
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),

    !isProd &&
    new WebpackNotifierPlugin({ excludeWarnings: true }),

    // isProd &&
    // new ExtractTextPlugin('bundle.css'),

    isProd &&
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.DedupePlugin(),

    isProd &&
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        // sourceMap: false, // default
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    isProd &&
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    !isProd &&
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    /*
    new webpack.optimize.CommonsChunkPlugin({
      // names: ['vendor', 'manifest'],
      name: 'static',
      filename: 'static.js',
      // minChunks(module, count) {
      minChunks(module) {
        // console.log(count);
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),*/

    // new webpack.optimize.OccurrenceOrderPlugin(),

    new HtmlWebpackPlugin({
      title: 'Test Task',
      template: '../webpack/template.html',
    }),

    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
    }),

    // new webpack.NormalModuleReplacementPlugin(/babel-runtime\/core-js\/promise/, 'bluebird'),

    // isProd && new OfflinePlugin({
    //   ServiceWorker: {
    //     navigateFallbackURL: '/',
    //   },
    //   AppCache: false,
    // }),
  ].filter(plugin => (plugin !== false)),
};

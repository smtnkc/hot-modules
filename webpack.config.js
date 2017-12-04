const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

// BEGIN: dev-prod-configuration
var isProd = process.env.NODE_ENV === 'production'; // true or false
// Hot-Module-Replacement Configurations
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: PATHS.dist + '/'
});
var cssConfig = isProd ? cssProd : cssDev;
// React-Hot-Loader Configurations
var jsProd = PATHS.src + '/scripts/app.js';
var jsDev = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:9000',
  'webpack/hot/only-dev-server',
  PATHS.src + '/scripts/app.js'
];
var jsEntry = isProd ? jsProd : jsDev;
// END: dev-prod-configuration

let config = {
  entry: {
    'app': jsEntry
  },
  output: {
    path: PATHS.dist,
    publicPath: '',
    filename: 'js/[name].bundle.js',
  },
  devServer: {
    compress: true,
    port: 9000,
    stats: 'errors-only',
    hot: true,
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [
      { // JS LOADER
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        loader: 'babel-loader'
      },
      { // PUG LOADER
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      { // STYLE LOADER
        test: /\.(css|scss|sass)$/,
        use: cssConfig
      },
      { // FILE LOADER
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          'file-loader?name=img/[name].[ext]',
          // 'image-webpack-loader' // to minify images
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      injectExtras: {
        head: [
        {
          tag: 'meta',
          charset: 'UTF-8',
          name: 'description',
          content: 'Simple HMR application'
        }
      ]},
      title: 'HMR',
      favicon: PATHS.src + '/favicon.png',
      template: PATHS.src + '/views/index.pug',
      chunks: ['app'],
      //minify: { collapseWhitespace: true },
      //hash: true,
      filename: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle.css',
      disable: !isProd, // enabled in production
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin({
      disable: isProd
    }),
    new webpack.NamedModulesPlugin({
      disable: isProd
    }
    ),
    new webpack.NoEmitOnErrorsPlugin({
      disable: isProd
    }),
  ]
}

module.exports = config;
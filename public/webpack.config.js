/* eslint-env node */
var webpack = require('webpack');
var path = require('path');

module.exports = {

  context: __dirname,
  entry: [
    './app/app.jsx'
//    'webpack-dev-server/client?http://localhost:8899',
//    'webpack/hot/only-dev-server'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/assets/dist/',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    modulesDirectories: [ 'node_modules', 'bower_components' ],
    alias: {
      'setup': path.join(__dirname, 'app/project-setup'),
      'actions': path.join(__dirname, 'app/actions'),
      'screens': path.join(__dirname, 'app/screens'),
      'stores': path.join(__dirname, 'app/stores'),
      'common': path.join(__dirname, 'app/common'),
      'mixins': path.join(__dirname, 'app/common/mixins'),
      'models': path.join(__dirname, 'app/common/models'),
      'helpers': path.join(__dirname, 'app/common/helpers'),
      'services': path.join(__dirname, 'app/common/services')
    },
    extensions: [ '', '.coffee', '.cjsx', '.js', '.jsx' ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    preLoaders: [
      {
        test: /\.coffee?$/,
        loader: 'coffeelint-loader'
      }
    ],
    loaders: [
      {
        test: /\.coffee?$/,
        loader: 'coffee-loader'
      },
      {
        test: /\.cjsx$/,
        loaders: ['coffee', 'cjsx']
      },
      {
        test: /\.jsx?$/,
        // TODO: Add 'react-hot' only for local dev deployment. Create a separate config.
        // TODO: See react-hot-loader/docs/Troubleshooting.md for details.
        // loaders: [ 'react-hot', 'babel' ],
        loaders: [ 'babel' ],
        exclude: /(node_modules|bower_components)/
      },
      // style! attaches the css to the DOM automatically,
      // which is not optimal for components
      {
        test: /project-setup\/.*\.scss$/,
        loader: 'css!autoprefixer!sass?' +
          'includePaths[]=' + path.join(__dirname, 'app/project-setup') +
          '&includePaths[]=' + path.join(__dirname, 'bower_components/foundation/scss')
      },
      {
        test: /\/(screens|common)\/.*\.scss$/,
        loader: 'style/useable!css!autoprefixer!sass?' +
          'includePaths[]=' + path.join(__dirname, 'app/project-setup') +
          '&includePaths[]=' + path.join(__dirname, 'bower_components/foundation/scss')
      },
      { test: /\.(png|jpg)$/, loader: 'url?limit=32768' },
      { test: /\.jade$/, loader: 'jade' },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000' }
    ],
    noParse: []
  },

  externals: {},
  devtool: 'eval'
};

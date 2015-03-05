/* eslint-env node */

'use strict';

var path = require('path');

module.exports = {

  context: __dirname,

  entry: {
    app: './app/app.jsx'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'assets/dist/',
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
      'mixins': path.join(__dirname, 'app/common/mixins')
    },
    extensions: [ '', '.js', '.jsx' ]
  },

  module: {
    loaders: [
        { test: /\.jsx?$/, loader: 'babel', exclude: /(node_modules|bower_components)/ },
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
          loader: 'url?limit=10000&minetype=application/font-woff'
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ],
    noParse: []
  },

  externals: {},
  devtool: 'eval'
};

'use strict';

module.exports = {
  context: __dirname,
  entry: {
    app: './app/app.jsx'
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: 'assets/dist/',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'setup': __dirname + '/app/project-setup',
      'actions': __dirname + '/app/actions',
      'screens': __dirname + '/app/screens',
      'stores': __dirname + '/app/stores',
      'common': __dirname + '/app/common',
      'mixins': __dirname + '/app/common/mixins'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
      // style! attaches the css to the DOM automatically,
      // which is not optimal for components
      {
        test: /\.scss$/, loader: 'css!autoprefixer!sass?' +
      'includePaths[]=' + __dirname + '/app/project-setup' +
      '&includePaths[]=' + __dirname + '/bower_components/foundation/scss'
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=32768'},
      {test: /\.jade$/, loader: 'jade'},
      {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file'}
    ],
    noParse: []
  },
  externals: {},
  devtool: 'eval'
};

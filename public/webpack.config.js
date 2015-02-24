'use strict';

module.exports = {
	context: __dirname,
	entry: {
		app: './app/app.js'
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
			'specific': __dirname + '/app/specific'
		}
	},
	module: {
		loaders: [
			{test: /\.scss$/, loader: 'css!autoprefixer!sass?' +
				'includePaths[]=' + __dirname + '/app/specific' +
				'&includePaths[]=' + __dirname + '/bower_components/foundation/scss'},

			{test: /\.(png|jpg)$/, loader: 'url?limit=32768'},
			{test: /\.jade$/, loader: 'jade'},
			{test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
			{test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file'}
		],
		noParse: [
		]
	},
	externals: {
	},
	devtool: 'eval'
};

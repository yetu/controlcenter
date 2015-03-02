var webpackConfig = require('../../../webpack.config');
//webpackConfig.cache = true;
webpackConfig.module.postLoaders = [
	{
		test: /\.js$/,
		exclude: /(.spec|setup|node_modules)/,
		loader: 'istanbul-instrumenter'
	}
];

module.exports = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../../../',
		frameworks: ['jasmine'],
		files: [
			'./app/project-setup/test/phantomjs-bind.polyfill.js',
			'./**/*.spec.js'
		],

//		preprocessors: {
//			'app/**/(!test|specific)/*.js': 'coverage'
//		},
		preprocessors: {
			'./**/*.spec.js': ['webpack']
		},

		webpack: {
			resolve: webpackConfig.resolve,
			module: webpackConfig.module,
			entry: {}
		},

		// 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots', 'progress', 'coverage'],

		coverageReporter: {
			reporters: [
				{ type: 'html', dir: '../coverage/', subdir: '.' },
				{ type: 'cobertura', dir:'../coverage/', subdir: '.' }
			]
		},
		port: 9876,
		colors: true,
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_ERROR,
		autoWatch: true,
		// Chrome, ChromeCanary, Firefox, Safari, PhantomJS, IE
		browsers: ['PhantomJS'],
		captureTimeout: 60000,
		singleRun: false,

		junitReporter: {
			outputFile: 'test-results.xml'
		}
	});
};

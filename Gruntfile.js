/*global global, module, require*/

var app = {
	args: global.process.argv,
	hostname: 'localhost',
	path: './',
	port: 8000,
	livereload: 8001,
	timestamp: new Date().getTime(),
	url: 'http://localhost:<%= connect.options.port %>/'
};

// Our startup function.
app.initialize = function(grunt) {
	var me = this;

	if (me.initialized) {
		return false;
	}

	app.config.karma.options.browserStack = grunt.file.readJSON(app.path + 'browserstack.json');

	require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig(me.config);
	me.tasks(grunt);

	return me.initialized = true;
};

// Setup our configuration.
app.config = {};

// Reference the parent so watch can leverage it.
app.config.app = app;

// Google Closure compiler for minification.
app.config.closure = app.config['closure-compiler'] = {
	release: {
		closurePath: './',
		js: app.path + 'dist/fallback.js',
		jsOutputFile: app.path + 'dist/fallback.min.js',
		maxBuffer: 10,
		externs: './build/externs.js',
		noreport: true,
		options: {
			compilation_level: 'ADVANCED_OPTIMIZATIONS',
			language_in: 'ECMASCRIPT5_STRICT'
		}
	}
};

// Files to concat for deployment.
app.config.concat = {
	release: {
		options: {
			banner: '/*jslint browser: true*/\n\n(function (global) {\n\'use strict\';\n\n',
			footer: '\n\n// Bootstrap the library.\nme.bootstrap();\n\nglobal.fallback = me;\n})(this);',
			stripBanners: true
		},

		// Specifically in this order.
		src: [
			app.path + 'module/core.js',
			app.path + 'module/amd.js',
			app.path + 'module/loader.js',
			app.path + 'module/javascript.js',
			app.path + 'module/stylesheet.js'
		],

		dest: app.path + 'dist/fallback.js'
	}
};

// Setup our connect server to local testing.
app.config.connect = {
	options: {
		hostname: app.hostname,
		port: app.port
	},

	dev: {
		options: {
			middleware: function (connect) {
				return [
					require('connect-livereload')({
						port: app.livereload
					}),

					app.mount(connect, app.path)
				];
			}
		}
	}
};

// Files to run JSHint check on.
app.config.jshint = {
	files: [app.path + 'module/*.js'],

	options: {
		'-W065': true,
		'-W093': true,

		globals: {
			console: false
		}
	}
};

// Run our unit tests.
app.config.karma = {
	options: {
		// Gets pulled from file.
		browserStack: null,

		// @reference http://www.browserstack.com/list-of-browsers-and-platforms?product=live
		customLaunchers: {
			bs_win_xp_ie_6: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '6.0',
				os: 'Windows',
				os_version: 'XP'
			},

			bs_win_xp_ie_7: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '7.0',
				os: 'Windows',
				os_version: 'XP'
			},

			bs_win_xp_ie_8: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '8.0',
				os: 'Windows',
				os_version: 'XP'
			},

			bs_win_7_ie_9: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '9.0',
				os: 'Windows',
				os_version: '7'
			},

			bs_win_7_ie_10: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '10.0',
				os: 'Windows',
				os_version: '7'
			},

			bs_win_8_ie_11: {
				base: 'BrowserStack',
				browser: 'ie',
				browser_version: '11.0',
				os: 'Windows',
				os_version: '8'
			},

			bs_ios_6_iphone_4: {
				base: 'BrowserStack',
				device: 'iPhone 5',
				os: 'ios',
				os_version: '6.0'
			},

			bs_ios_7_iphone_5: {
				base: 'BrowserStack',
				browser: 'Mobile Safari',
				device: 'iPhone 5',
				os: 'ios',
				os_version: '7.0'
			},

			bs_android_froyo_galaxy: {
				base: 'BrowserStack',
				browser: 'Android Browser',
				device: 'Samsung Galaxy S',
				os: 'android',
				os_version: '2.2'
			},

			bs_android_jelly_bean_nexus: {
				base: 'BrowserStack',
				browser: 'Android Browser',
				device: 'LG Nexus 4',
				os: 'android',
				os_version: '4.2'
			}
		},

		autoWatch: true,
		captureTimeout: 60000,
		colors: true,
		files: [app.path + 'dist/fallback.js', 'test/**/*.js', 'test/**/**/*.js'],
		frameworks: ['mocha', 'expect'],
		logLevel: 'INFO',
		port: 9876,
		reporters: ['progress', 'html'],
		singleRun: true,

		htmlReporter: {
			outputFile: app.path + 'test/result/' + app.timestamp + '.html'
		}
	},

	dev: {
		browsers: ['Chrome']
	},

	// @todo
	release: {
		browsers: [
			'Chrome',
			'Firefox',
			'Safari',
			'bs_win_7_ie_10'
		]
	}
};

// When starting up Grunt open specific pages.
app.config.open = {
	dev: {
		path: app.url + 'dev/'
	},

	unit: {
		path: app.path + 'test/result/' + app.timestamp + '.html'
	}
};

// Files to watch for changes during the development process.
app.config.watch = {
	dev: {
		options: {
			livereload: app.livereload
		},

		tasks: ['build'],

		files: [
			'<%= app.path %>module/*.js',
			'<%= app.path %>plugin/*.js',
			'<%= app.path %>test/**/**/*.js',
			'<%= app.path %>test/**/**/**/*.js',
			'<%= app.path %>dev/*'
		]
	}
};

// The location we want to mount for our connect server.
app.mount = function(connect, directory) {
	return connect['static'](require('path').resolve(directory));
};

// Set up our different sets of task.
app.tasks = function(grunt) {
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build', [
		'jshint',
		'concat'
	]);

	grunt.registerTask('minify', [
		'closure-compiler'
	]);

	grunt.registerTask('dev', [
		'build',
		'karma:dev',
		'open:unit',
		'connect:dev',
		'open:dev',
		'watch:dev'
	]);

	grunt.registerTask('test', [
		'karma:dev',
		'open:unit'
	]);

	grunt.registerTask('release', [
		'build',
		'minify',
		'karma:release',
		'open:unit'
	]);
};

// Run our app.
module.exports = function(grunt) {
	return app.initialize(grunt);
};
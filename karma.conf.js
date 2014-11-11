module.exports = function(config) {
	// @reference https://saucelabs.com/platforms
	var customLaunchers = {
		sl_xp_ie6: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows XP',
			version: '6'
		},

		sl_xp_ie7: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows XP',
			version: '7'
		},

		sl_xp_ie8: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows XP',
			version: '8'
		},

		sl_win7_ie9: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 7',
			version: '9'
		},

		sl_win7_ie10: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 7',
			version: '10'
		},

		sl_win7_ie11: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 7',
			version: '11'
		},

		sl_win7_chrome: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Windows 7'
		},

		sl_win7_firefox: {
			base: 'SauceLabs',
			browserName: 'firefox',
			platform: 'Windows 7'
		},

		sl_win7_opera: {
			base: 'SauceLabs',
			browserName: 'opera',
			platform: 'Windows 7'
		}
	};

	config.set({
		autoWatch: true,
		browsers: Object.keys(customLaunchers),
		captureTimeout: 60000,
		customLaunchers: customLaunchers,
		colors: true,
		files: ['dist/fallback.js', 'test/**/*.js', 'test/**/**/*.js'],
		frameworks: ['mocha', 'expect'],

		htmlReporter: {
			outputDir: 'tests/'
		},

		logLevel: 'INFO',
		port: 9876,
		reporters: ['progress', 'saucelabs'],

		saurceLabs: {
			testName: 'Fallback JS - Karma Unit Test'
		},

		singleRun: true,

		client: {
			useIframe: false
		}
	});
};

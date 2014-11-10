module.exports = function(config) {
	// @reference https://saucelabs.com/platforms
	var customLaunchers = {
		sl_chrome: {
			base: 'SauceLabs',
			browserName: 'chrome',
			platform: 'Windows 7',
			version: '35'
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

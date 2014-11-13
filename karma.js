module.exports = function(config) {
	// Native node modules.
	var fs = require('fs');
	var path = require('path');

	// Karma configuration.
	var karma = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'karma.json')).toString());

	// Sauce Labs configuration. @reference https://saucelabs.com/platforms
	var saucelabs = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'saucelabs.json')).toString());

	// Object.keys(saucelabs);
	karma.browsers = ['android40', 'android44', 'win7Chrome', 'win7Firefox', 'win7Opera', 'win7Safari'];

	karma.customLaunchers = saucelabs;

	config.set(karma);
};

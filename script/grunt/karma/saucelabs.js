module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;
	var browsers = grunt.file.readJSON(uri.config + 'saucelabs.json');

	for (var index in browsers) {
		tasks.karma[index] = {};
		tasks.karma[index].browsers = [index];
		tasks.karma[index].logLevel = tasks.karma.options.logLevel;
		tasks.karma[index].options = {};
		tasks.karma[index].options.files = tasks.karma.options.files;
		tasks.karma[index].transports = ['jsonp-polling'];
	}

	return tasks;
};

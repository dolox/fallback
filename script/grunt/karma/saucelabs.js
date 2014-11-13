module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;
	var browsers = grunt.file.readJSON(uri.config + 'saucelabs.json');

	var index = 'PhantomJS';
	tasks.karma[index] = {};
	tasks.karma[index].browsers = [index];
	tasks.karma[index].options = {};
	tasks.karma[index].options.files = tasks.karma.options.files;

	for (index in browsers) {
		tasks.karma[index] = {};
		tasks.karma[index].browsers = [index];
		tasks.karma[index].options = {};
		tasks.karma[index].options.files = tasks.karma.options.files;
	}
	return tasks;
};

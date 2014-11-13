module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.options = grunt.file.readJSON(uri.config + 'karma.json');
	me.options.customLaunchers = grunt.file.readJSON(uri.config + 'saucelabs.json');

	tasks.karma = me;

	grunt.app.boot.gruntTasks('karma/', tasks);

	return tasks;
};

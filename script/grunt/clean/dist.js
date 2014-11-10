module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;

	tasks.clean.dist = [uri.dist];

	return tasks;
};

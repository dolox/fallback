module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;

	tasks.clean.docsCopy = [uri.root + 'docs/fallback.html'];

	return tasks;
};

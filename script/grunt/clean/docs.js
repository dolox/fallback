module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;

	tasks.clean.docs = [uri.root + 'docs'];

	return tasks;
};

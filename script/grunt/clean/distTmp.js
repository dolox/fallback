module.exports = function(grunt, tasks) {
	var uri = grunt.app.config.uri;

	tasks.clean.distTmp = [uri.distTmp];

	return tasks;
};

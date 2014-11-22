module.exports = function(grunt, tasks) {
	tasks.closureCompiler = {};

	grunt.app.boot.gruntTasks('minify/', tasks);

	return tasks;
};

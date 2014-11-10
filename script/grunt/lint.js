module.exports = function(grunt, tasks) {
	tasks.lint = {};

	grunt.app.boot.gruntTasks('lint/', tasks);

	grunt.registerTask('lint', [
		'lintJs'
	]);

	return tasks;
};

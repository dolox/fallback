module.exports = function(grunt, tasks) {
	tasks.watch = {};

	grunt.app.boot.gruntTasks('watch/', tasks);

	return tasks;
};

module.exports = function(grunt, tasks) {
	tasks.copy = {};

	grunt.app.boot.gruntTasks('copy/', tasks);

	return tasks;
};

module.exports = function(grunt, tasks) {
	tasks.wrap = {};

	grunt.app.boot.gruntTasks('wrap/', tasks);

	return tasks;
};

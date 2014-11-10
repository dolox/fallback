module.exports = function(grunt, tasks) {
	tasks.concat = {};

	grunt.app.boot.gruntTasks('concat/', tasks);

	return tasks;
};

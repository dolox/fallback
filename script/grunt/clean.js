module.exports = function(grunt, tasks) {
	tasks.clean = {};

	grunt.app.boot.gruntTasks('clean/', tasks);

	return tasks;
};

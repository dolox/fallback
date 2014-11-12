module.exports = function(grunt, tasks) {
	tasks.assemble = {};

	grunt.app.boot.gruntTasks('assemble/', tasks);

	return tasks;
};

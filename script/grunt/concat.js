module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.src = [uri.src + '*.js'];

	tasks.concat = me;

	grunt.app.boot.gruntTasks('concat/', tasks);

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.options = {
		debounceDelay: 500,
		livereload: grunt.app.config.livereloadPort,
		livereloadOnError: false,
		spawn: false
	};

	me.files = [
		uri.root + 'tests/*',
		uri.root + 'tests/**/*',
		uri.root + 'tests/**/**/*',
		uri.root + 'tests/**/**/**/*'
	];

	me.tasks = ['karma:dev'];

	tasks.watch.tests = me;

	return tasks;
};

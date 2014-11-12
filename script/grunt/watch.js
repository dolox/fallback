module.exports = function(grunt, tasks) {
	var config = grunt.app.config;
	var me = {};

	me.options = {
		debounceDelay: 500,
		livereload: config.livereloadPort,
		livereloadOnError: false,
		spawn: false
	};

	me.files = [
		config.uri.root + 'Gruntfile.js',
		config.uri.src + '*',
		config.uri.config + '*',
		config.uri.root + 'examples/*',
		config.uri.root + 'examples/**/*'
	];

	me.tasks = ['devHup'];

	tasks.watch = {};

	tasks.watch.dist = me;

	return tasks;
};

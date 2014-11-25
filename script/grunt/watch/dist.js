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
		uri.root + 'Gruntfile.js',
		uri.src + '*',
		uri.src + '**/*',
		uri.config + '*',
		uri.root + 'examples/*',
		uri.root + 'examples/**/*'
	];

	me.tasks = ['devHup'];

	tasks.watch.dist = me;

	return tasks;
};

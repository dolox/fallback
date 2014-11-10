module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.js = {};

	me.js.options = {
		config: uri.root + '.eslintrc'
	};

	me.js.src = [
		uri.root + 'Gruntfile.js',
		uri.script + '**/*.js',
		uri.src + '*.js'
	];

	tasks.eslint = me;

	grunt.registerTask('lintJs', [
		'eslint'
	]);

	return tasks;
};

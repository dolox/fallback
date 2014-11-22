module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.root + 'README.md';

	me.options = {};

	me.options.data = [
		uri.dist + 'js/fallback.js',
		uri.dist + 'js/fallback.min.js',
		uri.root + 'package.json'
	];

	me.options.helpers = [
		'script/handlebars/*.js'
	];

	me.options.ext = '.md';

	me.src = uri.root + 'README.hbs.md';
	tasks.assemble.readme = me;

	return tasks;
};

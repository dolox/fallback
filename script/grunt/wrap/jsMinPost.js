module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.cwd = '/';

	me.dest = uri.dist + 'fallback.min.js';

	me.options = {};

	me.options.wrapper = [
		tasks.wrap.banner,
		''
	];

	me.src = [uri.dist + 'fallback.min.js'];

	tasks.wrap.jsMinPost = me;

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.cwd = '/';

	me.dest = uri.dist + 'fallback.js';

	me.options = {};

	me.options.wrapper = [me.prefix, me.suffixWithBanner];

	me.src = [uri.distTmp + 'fallback.js'];

	tasks.wrap.js = me;

	return tasks;
};

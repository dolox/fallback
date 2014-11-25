module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.cwd = '/';

	me.dest = uri.distTmp + 'fallback.min.js';

	me.options = {};

	me.options.wrapper = [grunt.wrapPrefix, grunt.wrapSuffixWithName];

	me.src = [uri.distTmp + 'fallback.min.js'];

	tasks.wrap.jsMin = me;

	return tasks;
};

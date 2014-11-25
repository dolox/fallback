module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.dist + 'fallback.js';

	me.options = {};

	me.options.wrapper = [grunt.wrapPrefix, grunt.wrapSuffixWithBanner];

	me.src = [uri.distTmp + 'fallback.js'];

	tasks.wrap.js = me;

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.dist + 'fallback.min.js';

	me.options = {};

	me.options.wrapper = [grunt.wrapBanner, ''];

	me.src = [uri.dist + 'fallback.min.js'];

	tasks.wrap.jsMinPost = me;

	return tasks;
};

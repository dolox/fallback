module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.options = {};

	me.options.output = uri.root + 'docs/';

	me.src = uri.dist + 'fallback.js';

	tasks.docco = me;

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.distTmp + 'fallback.js';

	me.src = tasks.concat.files;

	tasks.concat.js = me;

	return tasks;
};

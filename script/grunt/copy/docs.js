module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.files = [{
		dest: uri.root + 'docs/index.html',
		src: uri.root + 'docs/fallback.html'
	}];

	tasks.copy.docs = me;

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.options = {};

	me.options.data = [
		uri.dist + 'js/fallback.js',
		uri.dist + 'js/fallback.min.js'
	];

	me.files = [{
		dest: uri.root + 'README.md',
		src: [uri.root + 'README.md.hbs']
	}];

	tasks.assemble.readme = me;

	return tasks;
};

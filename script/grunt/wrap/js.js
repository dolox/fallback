module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');

	me.cwd = '/';

	me.dest = uri.dist + 'fallback.js';

	me.options = {};

	me.options.wrapper = [
		tasks.wrap.banner + '\n(function(global) {\n',
		'me.banner = \'' + packageJson.banner + '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(window);'
	];

	me.src = [uri.distTmp + 'fallback.js'];

	tasks.wrap.js = me;

	return tasks;
};

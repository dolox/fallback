module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');

	me.cwd = '/';

	me.dest = uri.distTmp + 'fallback.min.js';

	me.options = {};

	me.options.wrapper = [
		tasks.wrap.banner + '\n(function(global) {\n',
		'me.banner = \'' + packageJson.name + '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(this);'
	];

	me.src = [uri.distTmp + 'fallback.min.js'];

	tasks.wrap.jsMin = me;

	return tasks;
};

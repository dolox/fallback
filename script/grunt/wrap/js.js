module.exports = function(grunt, tasks) {
	var me = {};
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');
	var uri = grunt.app.config.uri;

	me.cwd = '/';

	me.dest = uri.dist + 'fallback.js';

	me.options = {};

	var banner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + '| Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n\n';

	me.options.wrapper = [
		banner + '(function(window) {\n',
		'me.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(window);'
	];

	me.src = [uri.distTmp + 'fallback.js'];

	tasks.wrap.js = me;

	return tasks;
};

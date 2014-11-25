module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');

	var banner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + ' | Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n';
	me.prefix = banner + '\n(function(global) {\n';

	var wrapPrefix = 'me.banner = \'';
	var wrapSuffix = '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(this);';

	me.suffixWithBanner = wrapPrefix + packageJson.banner + wrapSuffix;

	me.suffixWithName = wrapPrefix + packageJson.name + wrapSuffix;

	tasks.wrap = me;

	grunt.app.boot.gruntTasks('wrap/', tasks);

	return tasks;
};

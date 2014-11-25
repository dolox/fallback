module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');

	grunt.wrapBanner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + ' | Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n';

	grunt.wrapPrefix = grunt.wrapBanner + '\n(function(global) {\n';

	var suffixPrefix = 'me.banner = \'';
	var suffixSuffix = '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(this);';

	grunt.wrapSuffixWithBanner = suffixPrefix + packageJson.banner + suffixSuffix;

	grunt.wrapSuffixWithName = suffixPrefix + packageJson.name + suffixSuffix;

	tasks.wrap = me;

	grunt.app.boot.gruntTasks('wrap/', tasks);

	return tasks;
};

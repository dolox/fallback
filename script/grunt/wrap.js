module.exports = function(grunt, tasks) {
	var me = {};
	var files = {};
	var uri = grunt.app.config.uri;

	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');
	var wrapBanner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + ' | Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n';
	var wrapPrefix = wrapBanner + '\n(function(global) {\n';
	var wrapSuffixPrefix = 'me.banner = \'';
	var wrapSuffixSuffix = '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(this);';

	files.js = {};
	files.js.dest = uri.dist + 'fallback.js';
	files.js.options.wrapper = [wrapPrefix, wrapSuffixPrefix + packageJson.banner + wrapSuffixSuffix];
	files.js.options = {};
	files.js.src = [uri.dist + 'fallback.js'];

	files.jsMin = {};
	files.jsMin.dest = uri.distTmp + 'fallback.min.js';
	files.jsMin.options.wrapper = [wrapPrefix, wrapSuffixPrefix + packageJson.name + wrapSuffixSuffix];
	files.jsMin.options = {};
	files.jsMin.src = [uri.distTmp + 'fallback.min.js'];

	files.jsMinPost = {};
	files.jsMinPost.dest = uri.dist + 'fallback.min.js';
	files.jsMinPost.options.wrapper = [wrapBanner, ''];
	files.jsMinPost.options = {};
	files.jsMinPost.src = [uri.dist + 'fallback.min.js'];

	tasks.wrap = me;

	//grunt.app.boot.gruntTasks('wrap/', tasks);

	return tasks;
};

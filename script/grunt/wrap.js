module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');
	var wrapBanner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + ' | Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n';
	var wrapPrefix = wrapBanner + '\n(function(global) {\n';
	var wrapSuffixPrefix = 'me.banner = \'';
	var wrapSuffixSuffix = '\';\n\nme.homepage = \'' + packageJson.homepage + '\';\n\nme.version = \'' + packageJson.version + '\';\n\nme.init();\n\n})(this);';

	me.js = {};
	me.js.dest = uri.dist + 'fallback.js';
	me.js.options = {};
	me.js.options.wrapper = [wrapPrefix, wrapSuffixPrefix + packageJson.banner + wrapSuffixSuffix];
	me.js.src = [uri.distTmp + 'fallback.js'];

	me.jsMin = {};
	me.jsMin.dest = uri.distTmp + 'fallback.min.js';
	me.jsMin.options = {};
	me.jsMin.options.wrapper = [wrapPrefix, wrapSuffixPrefix + packageJson.name + wrapSuffixSuffix];
	me.jsMin.src = [uri.distTmp + 'fallback.min.js'];

	me.jsMinPost = {};
	me.jsMinPost.dest = uri.dist + 'fallback.min.js';
	me.jsMinPost.options = {};
	me.jsMinPost.options.wrapper = [wrapBanner, ''];
	me.jsMinPost.src = [uri.dist + 'fallback.min.js'];

	tasks.wrap = me;

	return tasks;
};

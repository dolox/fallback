module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;
	var packageJson = grunt.file.readJSON(grunt.app.config.uri.root + 'package.json');

	me.banner = '/* fallback.js v' + grunt.file.readJSON(uri.root + 'package.json').version + ' | ' + packageJson.homepage + ' | Salvatore Garbesi <sal@dolox.com> | (c) ' + new Date().getFullYear() + ' Dolox, Inc. */\n';

	tasks.wrap = me;

	grunt.app.boot.gruntTasks('wrap/', tasks);

	return tasks;
};

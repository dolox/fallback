module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.options = {};

	me.options.src = [
		uri.src + 'core.js'
	];

	grunt.file.expandMapping([uri.src + '*.js'], null, {
		rename: function(dest, matchedSrcPath) {
			if (matchedSrcPath !== me.options.src[0]) {
				me.options.src.push(matchedSrcPath);
			}

			return matchedSrcPath;
		}
	});

	tasks.concat = me;

	grunt.app.boot.gruntTasks('concat/', tasks);

	return tasks;
};

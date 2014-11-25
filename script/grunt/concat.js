module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.files = [
		uri.src + 'core.js'
	];

	grunt.file.expandMapping([uri.src + '*.js'], null, {
		rename: function(dest, matchedSrcPath) {
			if (matchedSrcPath !== me.files[0]) {
				me.files.push(matchedSrcPath);
			}

			return matchedSrcPath;
		}
	});

	tasks.concat = me;

	grunt.app.boot.gruntTasks('concat/', tasks);

	return tasks;
};

module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.distTmp + 'fallback.js';

	me.src = [
		uri.src + 'core.js'
	];

	grunt.file.expandMapping(tasks.concat.src, null, {
		rename: function(dest, matchedSrcPath) {
			if (matchedSrcPath !== me.src[0]) {
				me.src.push(matchedSrcPath);
			}

			return matchedSrcPath;
		}
	});

	tasks.concat.js = me;

	return tasks;
};

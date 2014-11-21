module.exports = function(grunt, tasks) {
	var me = {};
	var uri = grunt.app.config.uri;

	me.dest = uri.distTmp + 'fallback.min.js';

	me.options = {};

	me.options.process = function(src) {
		var factored = '';
		var count = 0;
		var logLevels = false;
		var logFunction = false;

		src.split('\n').forEach(function(line) {
			line = line.trim();
			count++;
			if (line.substr(0, 7) === 'me.log(') {
				return;
			}

			if (line.substr(0, 8) === 'me.log =') {
				logFunction = true;
				return;
			}

			if (line === 'me.log.levels = {') {
				logLevels = true;
				return;
			}

			if (logFunction && !logLevels) {
				return;
			}

			if (logLevels) {
				if (line === '};') {
					logFunction = logLevels = false;
				}

				return;
			}

			factored += line + '\n';
		});

		return factored;
	};

	me.src = [
		uri.src + 'core.js'
	];

	grunt.file.expandMapping([uri.src + '*.js'], null, {
		rename: function(dest, matchedSrcPath) {
			if (matchedSrcPath !== me.src[0]) {
				me.src.push(matchedSrcPath);
			}

			return matchedSrcPath;
		}
	});

	tasks.concat.jsMin = me;

	return tasks;
};

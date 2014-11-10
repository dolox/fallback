module.exports = function(grunt, tasks) {
	tasks.karma = {};

	tasks.karma.options = {
		configFile: grunt.app.config.uri.root + 'karma.conf.js'
	};

	tasks.karma.dev = {
		//browsers: ['Chrome']
	};

	return tasks;
};

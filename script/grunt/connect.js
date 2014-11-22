module.exports = function(grunt, tasks) {
	var config = grunt.app.config;
	var me = {};

	me.options = {};

	me.options.middleware = function (connect) {
		return [
			require('connect-livereload')({
				port: config.livereloadPort
			}),

			connect.static(config.uri.root)
		];
	};

	tasks.connect = {};

	tasks.connect.options = {
		hostname: config.host,
		port: config.port
	};

	tasks.connect.dist = me;

	return tasks;
};

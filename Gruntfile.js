var me = {
	glob: require('glob'),
	path: require('path')
};

me.init = function(grunt) {
	me.grunt = grunt;
	me.grunt.app = me;
};

me.boot = function() {
	me.data.gruntTasks = {};
	me.boot.gruntTasks('', me.data.gruntTasks);

	me.boot.nodeModules();
	me.boot.tasks();
};

me.boot.gruntTasks = function(directory, tasks) {
	var files = me.glob.sync(me.config.uri.scriptGrunt + directory + '*.js');

	files.forEach(function(file) {
		tasks = require(file)(me.grunt, tasks);
	});

	me.grunt.initConfig(tasks);
};

me.boot.nodeModules = function() {
	var files = me.glob.sync(me.config.uri.nodeModules + 'grunt-*');

	files.push('assemble');

	files.forEach(function(file) {
		var nodeModule = file.substr(file.lastIndexOf('/') + 1);

		if (!nodeModule) {
			return;
		}

		me.grunt.loadNpmTasks(nodeModule);
	});
};

me.boot.tasks = function() {
	var reference = null;

	for (var index in me.tasks) {
		if (!(reference = me.tasks[index])) {
			return;
		}

		reference();
	}
};

me.config = {
	host: 'localhost',
	livereloadPort: 3001,
	port: 3000
};

me.config.uri = {
	config: me.path.join(__dirname, '/config/'),
	dist: me.path.join(__dirname, '/dist/'),
	distTmp: me.path.join(__dirname, '/dist/tmp/'),
	nodeModules: me.path.join(__dirname, '/node_modules/'),
	root: me.path.join(__dirname, '/'),
	script: me.path.join(__dirname, '/script/'),
	scriptGrunt: me.path.join(__dirname, '/script/grunt/'),
	src: me.path.join(__dirname, '/src/')
};

me.data = {};

me.tasks = {};

me.tasks.build = function() {
	me.grunt.registerTask('build', [
		'clean:dist',
		'lint',
		'concat',
		'wrap',
		'closureCompiler',
		'docs',
		'clean:distTmp',
		'assemble'
	]);
};

me.tasks.def = function() {
	me.grunt.registerTask('default', [
		'build'
	]);
};

me.tasks.dev = function() {
	me.grunt.registerTask('dev', [
		'default',
		'connect',
		'watch:dist'
	]);
};

me.tasks.devTest = function() {
	me.grunt.registerTask('devTests', [
		'karma:dev',
		'watch:tests'
	]);
};

me.tasks.devHup = function() {
	me.grunt.registerTask('devHup', [
		'newer:clean:dist',
		'newer:eslint',
		'newer:concat',
		'newer:wrap',
		'newer:closureCompiler',
		'newer:clean:distTmp',

		'docs',
		'assemble'
	]);
};

me.tasks.docs = function() {
	me.grunt.registerTask('docs', [
		'docco',
		'copy:docs',
		'clean:docsCopy'
	]);
};

me.tasks.test = function() {
	me.grunt.registerTask('test', function() {
		Object.keys(me.grunt.config.data.karma).forEach(function(key) {
			if (key === 'dev' || key === 'options') {
				return;
			}

			me.grunt.task.run('karma:' + key);
		});
	});
};

me.tasks.dist = function() {
	me.grunt.registerTask('dist', [
		'default'
	]);
};

module.exports = function(grunt) {
	me.init(grunt);
	me.boot();
};

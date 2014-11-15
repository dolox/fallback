module.exports = function(grunt, tasks) {
	var index = 'dev';

	tasks.karma[index] = {};
	tasks.karma[index].browsers = ['Chrome'];
	tasks.karma[index].options = {};
	tasks.karma[index].options.files = tasks.karma.options.files;

	return tasks;
};

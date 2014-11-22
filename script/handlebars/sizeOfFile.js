module.exports.sizeOfFile = function(file) {
	var fs = require('fs');
	var stats = fs.statSync(file);

	return Math.round(stats.size / 1000 * 100) / 100;
};

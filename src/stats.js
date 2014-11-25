// Output the configured libraries, their load times and other useful statistics for the end user.
var stats = function() {
	// Line separator `String`.
	var separator = '\n' + new Array(280).join('-') + '\n';

	// Padding `String` that we'll use for our output string.
	var padding30 = new Array(30).join(' ');

	// Padding `String` that we'll use for our output string.
	var padding60 = new Array(60).join(' ');

	// Generate the banner for our output.
	var output = stats.banner(separator, padding30, padding60);

	// Generate the heading of our output.
	output += stats.head(separator, padding30, padding60);

	// The body of our statistics table.
	me.each(me.module.definitions, function(value, key) {
		output += stats.row(key, value, padding30, padding60);
	});

	// Return our output `String`.
	return output;
};

stats.banner = function(separator, padding30, padding60) {
	var output = '\n';

	// Add our banner to the output string.
	if (me.banner.length === 8) {
		// Minified version of the library.
		output += me.stringPad(me.banner, padding60, true) + '\n';
	} else {
		// Non-minified version of the library.
		output += me.banner;
	}

	// Add the version to the bnaner.
	output += '\n' + me.stringPad('v' + me.version, padding60, true) + '\n';

	// Add the homepage to the banner.
	output += '\n' + me.stringPad(me.homepage, padding60, true) + '\n';

	// Separate the banner from the head column titles.
	output += separator;

	return output;
};

// Heading of the statistics output.
stats.head = function(separator, padding30, padding60) {
	// The table head column titles.
	var output = me.stringPad('Library', padding60);
	output += me.stringPad('Version', padding30);
	output += me.stringPad('Type', padding30);
	output += me.stringPad('Time', padding30);
	output += me.stringPad('Loaded', padding30);
	output += me.stringPad('Invoked', padding30);
	output += me.stringPad('Failed', padding30);
	output += 'Success';
	output += separator;

	// Return the heading.
	return output;
};

stats.row = function(key, value, padding30, padding60) {
	var time = (value.loader.timeEnd - value.loader.timeStart) / 1000;
	time = time || time === 0 ? time + 's' : 'N/A';

	var output = me.stringPad(key, padding60);
	output += me.stringPad(value.version, padding30);
	output += me.stringPad(typeof value.factory, padding30);
	output += me.stringPad(time, padding30);
	output += me.stringPad(me.normalizeBoolean(value.loader.loaded, false), padding30);
	output += me.stringPad(me.normalizeBoolean(value.invoked, false), padding30);
	output += me.stringPad(value.loader.failed.length, padding30);
	output += value.loader.success ? value.loader.success : 'N/A';
	output += '\n';

	return output;
};

// Reference the module within the library.
me.stats = stats;

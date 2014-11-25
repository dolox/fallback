// Logging function for when debugging is turned on.
var log = function() {
	// Make sure that both debugging is enable and what `global.console` exists.
	if (!me.debug || !global.console) {
		return false;
	}

	// Convert our `Arguments` into an `Array`.
	var args = me.arrayClone(arguments);

	// If we have no arguments, then halt the function.
	if (!args.length) {
		return false;
	}

	var first = args.shift();
	var level = me.log.levels[3];

	// If our first argument was a number, then it's our level to log at.
	if (me.isNumber(first)) {
		if (me.log.levels[first]) {
			level = me.log.levels[first];
		}

		first = args.shift();
	}

	// Check to make sure the level of the debug message is acceptable for the configured debugging output.
	if (me.debug !== true && me.debug !== level) {
		return false;
	}

	// The prefixes before our actual message.
	var prefixes = [first];

	// Loop through each arguments, til we find the first item that's not a space, or a string not containing a space.
	me.each(args, function(item) {
		if (!me.isString(item) || item.indexOf(' ') !== -1) {
			return false;
		}

		prefixes.push(args.shift());
	});

	// Make a reference to our function, if the our level function doesn't exist natively in the browser.
	var method = 'log';

	if (me.isFunction(global.console[level])) {
		method = level;
	}

	// The message for console.
	var message = '%cFallbackJS: %c' + level.toUpperCase() + ': ' + prefixes.join(': ') + ': %c' + args.join();
	var style1 = 'font-weight: bold; color: #da542c';
	var style2 = 'font-weight: bold; color: #000';
	var style3 = 'color: #777';

	// If we're in IE, ditch the console colors.
	if (me.browser.isIE()) {
		style1 = style2 = style3 = '';
		message = message.replace(/%c/g, '');
	}

	// Log our message to the console. @todo need a non colorful message for legacy ie
	return global.console[method](message, style1, style2, style3);
};

// The various levels for our `log` function.
log.levels = {
	1: 'error',
	2: 'warn',
	3: 'info'
};

// Reference the module within the library.
me.log = log;

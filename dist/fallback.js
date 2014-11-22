/* fallback.js v2.0.0 | http://fallback.io/ | Salvatore Garbesi <sal@dolox.com> | (c) 2014 Dolox, Inc. */

(function(global) {

// The container variable for our library instance. As you browse through the libraries code you'll see the `me`
// variable referenced throughout, this is simply short-hand for the library.
var me = {};

// Initialize our library. This function must be invoked before we start using the library.
me.init = function() {
	// Reference the `head` element of our document and store it into memory.
	me.head = global.document.getElementsByTagName('head')[0];

	// Spawn our utility functions for the library.
	me.init.utilities(me, me.utility.types);

	// Reference aliases for the library into the `global` object for the user to directly access.
	me.init.aliases(global, me.aliases);

	// Initialize our loader object.
	me.loader.init();

	// Flag that our library has been initialized.
	return me.inited = true;
};

// Reference the library's aliases into the `global` `Object` for the user to directly access. If a alias that we're
// attempting to reference currently exists in our `global` `Object`, then we won't override it.
me.init.aliases = function(container, input) {
	// Loop through each of our aliases.
	me.each(input, function(aliases, key) {
		// Store the module name that we'll reference throughout our loop.
		var moduleName = key;

		// Store the factory for our module that we'll reference throughout our loop.
		var factory = me;

		if (key === 'me') {
			// If the `key` is `me`, then we need to reference the library itself.
			moduleName = 'fallback';
		} else {
			// Reference the function within our library.
			factory = me[key];
		}

		// Define modules that reference back to the library so that they can be used within our `define` and `require`
		// functions. For example in a `define` `factory` we might want to access the `fallback` library, or the `require`
		// function, this will allow us to do that. Makes for good code encapsulation if the developer wants to take
		// advantage of it.
		me.define(moduleName, factory);

		// Fetch the reference of our new module.
		var module = me.module(moduleName, null, false);

		// Flag our new module as invoked and loaded since it's internal.
		module.invoked = module.loader.loaded = true;

		// Map all of our aliases to our module.
		me.each(aliases, function(alias) {
			// If the alias is currently defined in the `container` object, skip it and throw a warning to the end user.
			if (me.isDefined(container[alias])) {
				me.log('core', 'init', 'aliases', 'The variable container["' + alias + '"] already exists. Halted reference.');
				return;
			}

			// Map the alias to our module.
			me.module.alias(moduleName, alias);

			// Reference the alias of the module within the `container` reference.
			container[alias] = factory;
		});
	});
};

// Automatically spawn helper functions that we'll use throughout the library. For example we're spawning the following
// functions: `isArray`, `normalizeArray`, `normalizeArraySeries`, etc. Spawning these functions this way results in
// less code for the library and achieves the same objective.
me.init.utilities = function(container, input) {
	// Loop through each of our different utility types.
	for (var index in input) {
		// Make sure it's not empty.
		if (input[index]) {
			// Spawn the utility function for the library.
			me.utility(container, input[index]);
		}
	}
};

// This is where we hold all of our functional aliases for the library.
me.aliases = {
	// Referenecs for our `config` function.
	'config': ['cfg', 'conf', 'config'],

	// Referenecs for our `define` function.
	'define': ['def', 'define'],

	// Referenecs for the library.
	'me': ['fallback', 'fbk'],

	// Referenecs for our `require` function.
	'require': ['req', 'require']
};

// Fetch the parameters that are passed into a `Function` and return them in an `Array` `String` series. For example:
// `function(a, b, c)` returns `['a', 'b', 'c']`. Thanks to @toddmotto who wrote the better part of this `Function`.
// @reference http://toddmotto.com/angular-js-dependency-injection-annotation-process/
me.args = function(reference) {
	// If our `reference` is not a `Function`, then halt.
	if (!me.isFunction(reference)) {
		return [];
	}

	// Setup our regular expressions that we'll use to parse out the arguments of our `reference` `Function`.
	var expessions = {
		arg: /^\s*(_?)(.+?)\1\s*$/,
		args: /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		argsSplit: /,/,
		comments: /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
	};

	// The `Array` of our cleansed arguments from the `reference` `Function`.
	var args = [];

	// Strip out any comments that are listed in the `Function`.
	var name = reference.toString().replace(expessions.comments, '');

	// Explicity fetch the arguments out of the `Function`.
	var declaration = name.match(expessions.args);

	// Split on `,` and loop through each of the arguments.
	me.each(declaration[1].split(expessions.argsSplit), function(arg) {
		// Clean the dirty argument.
		arg.replace(expessions.arg, function(all, underscore, name) {
			// Push the cleansed argument to the `args` `Array`.
			args.push(name);
		});
	});

	// Return the cleansed `Array` of arguments from our `reference`.
	return args;
};

// Clone an array. `Array.prototype.slice` appears to be the most efficient way of doing this.
// @reference http://jsperf.com/new-array-vs-splice-vs-slice/19
me.arrayClone = function(input) {
	// If the `input` parameter is not an `Array` or `Object`, return an empty `Array`.
	if (!me.isArray(input) && !me.isObject(input) && typeof input !== 'object') {
		return [];
	}

	// Clone the Array.
	return Array.prototype.slice.call(input);
};

// Remove all duplicates from an array.
me.arrayUnique = function(input) {
	// Store our normalized values.
	var normalized = [];

	// If an array was not passed in, halt the function.
	if (!me.isArray(normalized)) {
		return normalized;
	}

	// Run through each of our `Array` values.
	me.each(input, function(value) {
		// Make sure the `value` doesn't already exist in our `normalized` `Array`.
		if (me.indexOf(normalized, value) === -1) {
			// Push our non-duplicated `value` off to our `normalized` `Array`.
			normalized.push(value);
		}
	});

	// Return our normalized set of unique values.
	return normalized;
};

// All of our browser detection functions reside here. Some browsers have special edge cases that we need to cater to,
// and that's the sole purpose of these functions.
me.browser = {};

// Detect whether or not the current browser is IE.
me.browser.isIE = function() {
	return window.document.documentMode ? true : false;
};

// Detect whether or not the current browser is IE11.
me.browser.isIE11 = function() {
	return Object.hasOwnProperty.call(global, 'ActiveXObject') && !global.ActiveXObject;
};

// The character to split our module names on to derive it's identity.
me.delimiter = '$';

// Shorthand for a `for in` loop. Less code, easier readability. If `false` is returned, the loop will be halted.
me.each = function(input, callback) {
	// If anything other than an `Array` or `Object` was passed in, halt the `Function`.
	if (!me.isArray(input) && !me.isObject(input) && typeof input !== 'object') {
		return;
	}

	// Normalize our callback to a `Function`.
	callback = me.normalizeFunction(callback);

	// Run our loop.
	for (var index in input) {
		// If a `false` is returned during the loop, then halt the loo!.
		if (callback(input[index], index) === false) {
			break;
		}
	}
};

// Whether or not to use a reference to `window` to check if a library has already been loaded. This is also used when
// loading libraries to determine if they loaded properly for legacy browsers.
me.globals = true;

// Generate a global unique idenifier.
me.guid = function() {
	return me.guid.block() + me.guid.block(true) + me.guid.block(true) + me.guid.block();
};

// Random blocks for a GUID.
me.guid.block = function(dashed) {
	var generated = (Math.random().toString(16) + '000000000').substr(2, 8);
	return dashed ? '-' + generated.substr(0, 4) + '-' + generated.substr(4, 4) : generated;
};

// Legacy browsers don't support `Array.prototype.indexOf`, this function dubs as a polyfill for this browsers. In
// particular IE < 9, doesn't support it. @ie @ie6 @ie7 @ie8
// @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
me.indexOf = function(input, value) {
	// By default we'll return `-1` if nothing is found to simulate the native `indexOf` functionality.
	var index = -1;

	// If our `input` is not an `Array`, or our `value is not a `String` or `Number`, halt the `Function`.
	if (!me.isArray(input) || !me.isString(value) && !me.isNumber(value)) {
		return index;
	}

	// Search through our `Array` for our `value`.
	me.each(input, function(iterationValue, iterationIndex) {
		// As soon as we find our first value, halt the loop.
		if (iterationValue === value) {
			// Set the index of our result.
			index = parseInt(iterationIndex, 10);

			// Halt the loop.
			return false;
		}
	});

	// Return the index of our `value`.
	return index;
};

// Check whether or not a variable is defined.
me.isDefined = function(variable) {
	return variable !== void 0;
};

// Check if a variable is a specific type.
me.isType = function(variable, type) {
	// Special check for `null` for legacy browsers. @ie
	if (type === 'Object' && variable === null) {
		return false;
	}

	// Special check for `undefined` for legacy browsers. @ie
	if (!me.isDefined(variable)) {
		return false;
	}

	// Run our global check.
	var valid = Object.prototype.toString.call(variable) === '[object ' + type + ']';

	// Newer browsers give the proper types for these, whereas legacy browsers don't. Instead of writing separate
	// functions and test for each, we can simply accept them all as being an object.
	if (valid === false && (type === 'HTMLCollection' || type === 'HTMLHeadElement' || type === 'HTMLScriptElement')) {
		// Special patch for Safari. @safari
		if (type === 'HTMLCollection') {
			valid = me.isType(variable, 'NodeList');
		}

		// Fallback on an `Object` for legacy browsers.
		if (!valid) {
			valid = me.isType(variable, 'Object');
		}
	}

	// Return whether or not our type is valid.
	return valid;
};

// Logging function for when debugging is turned on.
me.log = function() {
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
me.log.levels = {
	1: 'error',
	2: 'warn',
	3: 'info'
};

// Generate a normalization function based on the type that is passed in. For example if a type of `String` was passed
// in, the function `normalizeString` would be generated for the library. The purpose of these functions are to
// normalize any data that's passed into them. If you try to pass an `Array` to `normalizeString`, the function would
// then return the `fallback` value that is specified; if no `fallback` value is specified it would then return `null`.
me.normalize = function(input, type, fallback) {
	// Declare our function name;
	var functionName = 'is' + type;

	// If an invalid `type` is passed in to our function, return our `fallback` or `null`.
	if (!me.isFunction(me[functionName])) {
		return me.isDefined(fallback) ? fallback : null;
	}

	return me[functionName](input) ? input : fallback;
};

// Perform normalization on a series of data types. It provides the same functionality as the `normalize` function but
// it expects to receive of an `Array` series of data sets.
me.normalizeSeries = function(input, type, fallback, strip) {
	// Store our normalized series.
	var normalized = [];

	// Case our input to an array/series.
	if (!me.isArray(input)) {
		input = [input];
	}

	// Loop through eaach of our values. For legacy browsers, if `undefined` is part of an `Array` and you use a `for in`,
	// the iteration for `undefined` won't show up in the loop! This is a fallback for those browsers! Wow! @ie
	for (var index = 0; index < input.length; index++) {
		// Normalize our value.
		var value = me.normalize(input[index], type, fallback);

		// If strip is not explicity set in, and the `value` is `undefined` or `null`, it'll be removed from the normalized
		// result set.
		if (strip !== false && (!me.isDefined(value) || value === null)) {
			continue;
		}

		// Set our normalized value.
		normalized.push(value);
	}

	// Return our normalized series.
	return normalized;
};

// Constrain an object to only contain a specific set of keys. All other keys are discarded, and a warning is thrown.
me.objectConstrain = function(input, whitelist, reference) {
	// Store our normalized `Object`.
	var normalized = {};

	// If our `input` is not an `Object` return an empty `Object`.
	if (!me.isObject(input)) {
		return normalized;
	}

	// If we don't have a `whitelist` or if it's not an `Array`, return our `input`.
	if (!me.isArray(whitelist)) {
		return input;
	}

	// Loop through our `Object`.
	me.each(input, function(value, key) {
		// If the `key` is not defined in the `whitelist`, then discard it.
		if (me.indexOf(whitelist, key) === -1) {
			// Throw a warning to the user that we've discarded the `key` in question.
			if (reference) {
				me.log(2, 'core', 'objectConstrain', 'The key `' + key + '` is not allowed in `' + reference + '`, discarding.', input);
			}

			return;
		}

		// Set our normalized value.
		normalized[key] = value;
	});

	// Return our normalized `Object`.
	return normalized;
};

// Merge an `Object` with a set of default values. If the `defaults` parameter is an `Array`, it will treat whatever
// the value is for `fallback` as it's value.
me.objectMerge = function(input, defaults, fallback) {
	// Our normalized/merged `Object`.
	var normalized = {};

	// If our `input` is not an `Object` return an empty `Object`.
	if (!me.isObject(input)) {
		return normalized;
	}

	// The defaults to merge with.
	var defaultsIsArray = me.isArray(defaults);

	// If our defaults isn't an Array or Object, then return our `input`.
	if (!me.isObject(defaults) && !defaultsIsArray) {
		return input;
	}

	// Loop through our defaults.
	me.each(defaults, function(value, key) {
		// If our `defaults` is an `Array` we need to swap out the key/values.
		if (defaultsIsArray === true) {
			key = value;
			value = fallback;
		}

		// If the `key` is defined in our `input` object, then don't override it, reference it.
		if (me.isDefined(input[key])) {
			normalized[key] = input[key];
			return;
		}

		// Set the value of our default `key`.
		normalized[key] = value;
	});

	// Return our merged `Object`.
	return normalized;
};

// Run a number of functions in parallel with the ability to call a single callback once they've all completed.
me.parallel = function(references, callback) {
	// Our reference argument must be an `Array`, if not halt the function.
	if (!me.isArray(references)) {
		callback();
		return;
	}

	// Normalize our references.
	references = me.normalizeFunctionSeries(references, null, true);

	// Generate a new queue instance.
	var guid = me.parallel.generate(references.length);

	// Loop through all of our refernces and execute them.
	me.each(references, function(reference) {
		// Anonymous spawn and track our `Function` to invoke.
		me.parallel.anonymous(reference, guid, callback);
	});
};

// Our anonymous functions that we're executing in parallel.
me.parallel.anonymous = function(factory, guid, callback) {
	// If our `factory` parameter isn't a `Function`, halt the `Function`.
	if (!me.isFunction(factory)) {
		return;
	}

	// Normalize our `guid` parameter.
	guid = me.normalizeString(guid, me.guid(true));

	// Normalize our `callback` paramter.
	callback = me.normalizeFunction(callback);

	// Invoke our queued function.
	factory(function() {
		// Reference the instance of our parallel runner.
		var parallel = me.parallel.queue[guid];

		// If the `guid` is not defined in our queue, then it was cancelled.
		if (!me.isDefined(parallel)) {
			return callback(false);
		}

		// Increment our callback invocation count.
		parallel.interval++;

		// If all of our functions ran successful, process our final callback and clear our memory of the queue.
		if (parallel.interval === parallel.length) {
			// Remove our runner instance from the queue.
			delete me.parallel.queue[guid];

			// Fire off our final callback, as the queue has been exhausted.
			callback(true);
		}
	});
};

// Generate a new parallel instance into our queue.
me.parallel.generate = function(length) {
	// Generate a unique identifier for our parallel instance to avoid collisions.
	var guid = me.guid(true);

	// Add the our `references` to our parallel queue.
	me.parallel.queue[guid] = {
		// The number of callbacks that were invoked.
		interval: 0,

		// The total number of callbacks to run in parralel.
		length: length
	};

	return guid;
};

// Container `Object` for all of the currently running parallel jobs.
me.parallel.queue = {};

// Output the configured libraries, their load times and other useful statistics for the end user.
me.stats = function() {
	// Padding strings that we'll use for our output string.
	var separator = '\n' + Array(280).join('-') + '\n';
	var padding30 = Array(30).join(' ');
	var padding60 = Array(60).join(' ');

	// Add our banner to the output string.
	var output = '\n';

	if (me.banner.length === 8) {
		output += me.stringPad(me.banner, padding60, true) + '\n';
	} else {
		output += me.banner;
	}

	output += '\n' + me.stringPad('v' + me.version, padding60, true) + '\n';
	output += '\n' + me.stringPad(me.homepage, padding60, true) + '\n';
	output += separator;

	// The table header.
	output += me.stringPad('Library', padding60);
	output += me.stringPad('Version', padding30);
	output += me.stringPad('Type', padding30);
	output += me.stringPad('Time', padding30);
	output += me.stringPad('Loaded', padding30);
	output += me.stringPad('Invoked', padding30);
	output += me.stringPad('Failed', padding30);
	output += 'Success';
	output += separator;

	// The body of our table.
	me.each(me.module.definitions, function(value, key) {
		var time = (value.loader.timeEnd - value.loader.timeStart) / 1000;
		time = time || time === 0 ? time + 's' : 'N/A';

		output += me.stringPad(key, padding60);
		output += me.stringPad(value.version, padding30);
		output += me.stringPad(typeof value.factory, padding30);
		output += me.stringPad(time, padding30);
		output += me.stringPad(me.normalizeBoolean(value.loader.loaded, false), padding30);
		output += me.stringPad(me.normalizeBoolean(value.invoked, false), padding30);
		output += me.stringPad(value.loader.failed.length, padding30);
		output += value.loader.success ? value.loader.success : 'N/A';
		output += '\n';
	});

	return output;
};

// A function which simply pads a `String` with whatever `String` is supplied.
me.stringPad = function(input, pad, left) {
	if (!me.isDefined(pad)) {
		return input;
	}

	if (left) {
		return (pad + input).slice(-pad.length);
	}

	return (input + pad).substr(0, pad.length);
};

// Automatically generate utility functions for our library. This library will generate the following functions:
// - isArray, normalizeArray, normalizeArraySeries
// - isBoolean, normalizeBoolean, normalizeBooleanSeries
// - isFunction, normalizeFunction, normalizeFunctionSeries
// - isNumber, normalizeNumber, normalizeNumberSeries
// - isObject, normalizeObject, normalizeObjectSeries
// - isString, normalizeString, normalizeStringSeries
me.utility = function(container, type) {
	// Adding a function prefixed with `is` to check if a variable is actually the type that's being passed in.
	container['is' + type] = function(variable) {
		return me.isType(variable, type);
	};

	// Our normalization function.
	container['normalize' + type] = function(input, fallback) {
		return me.normalize(input, type, me.isDefined(fallback) ? fallback : null);
	};

	// Our normalization series function.
	container['normalize' + type + 'Series'] = function(input, fallback, strip) {
		return me.normalizeSeries(input, type, me.isDefined(fallback) ? fallback : [], strip);
	};
};

// The different utility types that we want to generate functions for.
me.utility.types = ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'];

/* global me */

// Configure the library. If the `input` is malformed then the `Function` will return `false`, otherwise the `Function`
// will return the normalized value that was imported.
me.config = function(input) {
	// If the `input` parameter is not an `Object`, then halt the `Function`.
	if (!me.isObject(input)) {
		me.log(2, 'config', 'Couldn\'t import config. The `input` must be an Object!', input);
		return false;
	}

	// Drop off any values in the user configuration `Object` which aren't whitelisted.
	input = me.objectConstrain(input, me.config.whitelist, 'fallback.config');

	// Merge in the whitelist with a `null` value for default, if not specified by the user.
	input = me.objectMerge(input, me.config.whitelist);

	// Loop through each of the keys for our `input` and run our normalization/import functions on each of them.
	me.each(input, function(value, key) {
		// Only accept the `value` if it's actually defined, otherwise we'll wind up overriding our existing configuration
		// unintentionally with `undefined` values.
		if (me.isDefined(value)) {
			me[key] = input[key] = me.config[key](value);
		}
	});

	// If `amd` is set to `true`, then set `define.amd` to an `Object`, otherwise force it to `undefined`.
	if (me.isDefined(input.amd) && input.amd === true) {
		me.define.amd = {};
	} else {
		me.define.amd = undefined;
	}

	// Return our normalized configuration.
	return input;
};

// Each of these functions expect to have values that's a `Boolean`. If this isn't the case, then a value of `false`
// will be set as the value.
me.config.amd =
me.config.globals = function(input) {
	return me.normalizeBoolean(input, false);
};

// Normalize and import the configuration for our `base` parameter. If a `String` is passed in, then the value for the
// `String` will be used for all of the loader types.
me.config.base = function(input) {
	// We expect the `base` parameter to be either a `String` or `Object`.
	if (!me.isString(input) && !me.isObject(input)) {
		me.log(2, 'config', 'The `value` passed in your `config` for `base` was malformed, discarding.', input);
		return null;
	}

	// If we have a `String`, generate an object with out whitelist of keys, and use the `String` as the value.
	if (me.isString(input)) {
		return input;
	}

	// If we received an `Object`, then merge in our defaults with a `null` value if they weren't specified.
	var normalized = me.objectMerge(input, me.config.base.whitelist, null);

	// If the values for the normalized `Object` aren't a `String`, then revert to `null`.
	me.each(normalized, function(value, key) {
		if (!me.isString(value)) {
			normalized[key] = null;
		}
	});

	// Return our normalized `Object`.
	return normalized;
};

// The whitelist of acceptable keys for `base` parameter if it's an `Object`.
me.config.base.whitelist = ['css', 'img', 'js'];

// The `debug` parameter can have a various set of values, this `Function` will normalize its value.
me.config.debug = function(input) {
	// If the `input` is a `String`, and it's in our whitelist, then accept it.
	if (me.isString(input) && me.indexOf(me.config.debug.whitelist, input) !== -1) {
		return input;
	}

	// Force the `input` to a `Boolean` and default it to `false`.
	return me.normalizeBoolean(input, false);
};

// Whitelisted values for our `debug` parameter.
me.config.debug.whitelist = [false, true, 'error', 'warn', 'info'];

// The character to split our module names on to derive it's identity. The value must always be a `String`.
me.config.delimiter = function(input) {
	return me.normalizeString(input, '$');
};

// Normalize and import the `libs` parameter's series of `Objects`.
me.config.libs = function(input) {
	// If the `libs` parameter isn't an `Object`, discard it and throw a warning to the end user.
	if (!me.isObject(input)) {
		me.log(2, 'config', 'The `libs` parameter in your `config` was malformed, discarding.', input);
		return {};
	}

	// The `normalized` value of our `input` parameter.
	var normalized = {};

	// Loop through our series of `Objects` for the `libs` parameter.
	me.each(input, function(value, key) {
		// Normalize the value.
		value = me.config.libs.value(value);

		// If our value is not an `Object` then the value is malformed, discard it and throw a warning to the end user.
		if (!me.isObject(value)) {
			me.log(2, 'config', 'libs', 'value', 'The `urls` in your `config` was malformed for `' + key + '`, discarding.', value);
			return;
		}

		// Populate our `normalized` `Object` with a normalized value.
		normalized = me.config.libs.populate(normalized, key, value);

		// Generate a module for this library.
		me.module(key, normalized[key]);
	});

	// Return our noramlized `Object`.
	return normalized;
};

// Normalize the `value` parameter and populate it within the `normalized` `Object`.
me.config.libs.populate = function(normalized, key, value) {
	// If the `normalized` parameter isn't an `Object`, or the `key` parameter isn't a string, then halt the function.
	if (!me.isObject(normalized) || !me.isString(key)) {
		return null;
	}

	// Reference our whitelist.
	var whitelist = me.config.libs.whitelist;

	// Constrain the keys of this object to our whitelist.
	value = me.objectConstrain(value, whitelist, 'fallback.config');

	// Merge in our defaults to fill in whatever keys are missing.
	value = me.objectMerge(value, whitelist);

	// Loop through and normalize each of the values for our `Object`.
	me.each(value, function(subValue, subKey) {
		// If `exports` is `undefined`, then use the `moduleName` as the `exports`.
		if (subKey === 'exports' && !me.isDefined(subValue)) {
			subValue = [key];
		}

		// If the `subKey` isn't a function, discard the normalization process for the iteration.
		if (!me.isFunction(me.config.libs[subKey])) {
			return;
		}

		value[subKey] = me.config.libs[subKey](subValue, key);
	});

	// Set our normalize value up for return.
	normalized[key] = value;

	// Return our populated normalized `Object`.
	return normalized;
};

// Normalize the value for an iteration of `libs` `Object`.
me.config.libs.value = function(value) {
	// If the value is a `String`, convert it to an `Array`.
	if (me.isString(value)) {
		value = [value];
	}

	// If the value is an `Array`, convert it to an `Object` where the parameter `urls` is the value.
	if (me.isArray(value)) {
		value = {
			urls: value
		};
	}

	// If we don't have an `Object` at this point, return an empty `Object`.
	if (!me.isObject(value)) {
		return {};
	}

	// Normalized the URL values as string series.
	value.urls = me.normalizeStringSeries(value.urls, null, true);

	// Return our normalized value.
	return value;
};

// Each of these functions expect to have values that are either a `String` or series of strings. If neither is the
// case, then an empty `Array` will be returned. If any non-string values are apart of the series, they'll be dropped
// from the series completely.
me.config.libs.alias =
me.config.libs.deps =
me.config.libs.exports =
me.config.libs.urls = function(input) {
	return me.normalizeStringSeries(input, null, true);
};

// If either `check` or `init is specified within the `libs` `Object`, then they must be a function or they'll be
// discarded.
me.config.libs.check =
me.config.libs.init = function(input) {
	if (!input || !me.isFunction(input)) {
		return null;
	}

	return input;
};

// Normalize the version number if it's passed in with the library's configuration. We have to force the value to a
// `String` due to version numbers showing up such as `1.0.1` which JavaScript doesn't support as a valid `Number`.
me.config.libs.version = function(input) {
	return me.normalizeString(input, null);
};

// The whitelist of acceptable keys for an `Object` in the `libs` parameter.
me.config.libs.whitelist = ['alias', 'check', 'deps', 'init', 'exports', 'urls', 'version'];

// The whitelist of acceptable keys for the `config` functions input `Object`.
me.config.whitelist = ['amd', 'base', 'debug', 'delimiter', 'globals', 'libs'];

/* global me */

// Defining anonymous and named modules for our library is done through this function. There are a number of ways to
// pass arguments into this function, for more details see comments in the `me.define.args` function.
me.define = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.define.args.apply(null, arguments);

	// If a name and factory weren't passed in, throw a notice to the end user and halt our function.
	if (!args.name && !me.isDefined(args.factory)) {
		me.log(1, 'define', 'No `name` or `factory` sent to the `define` function! Halting!', args);
		return;
	}

	// Fill up our dependencies.
	args = me.define.deps(args);

	// If we're attempting to define an anonymous module, and we already have an anonymous module that was previously
	// passed to the function before we had a chance to actually declare it's name, then there was 2 anonymous modules
	// which were passed in through a single file. We cannot due this due to the fact that we have no way of knowing which
	// name should be assigned to which `define` instance that was called. If we did allow this to go through, we would
	// essentially be overwriting our previous anonymous module. If this happens we'll simply halt the function and a
	// throw a notice to our end user.
	if (!args.name) {
		// We cannot define multiple anonymous modules with the same name!
		if (me.isDefined(me.define.anonymous.factory)) {
			me.log(1, 'define', 'Multiple Anonymous modules defined in the same file! Halting!', args);
			return;
		}

		// If we don't have a name for our module, then we'll define it as an anonymous module. Our callback that loaded our
		// file will see this and set the proper name once the callback executes, which will happen synchronously.
		me.define.anonymous.save(args);
		return;
	}

	// Generate our new module and reference it as our last defined module.
	me.define.module.last = me.define.module(args);

	// Reset any anonymous modules that were waiting in limbo. If we don't configure a module, use the `require` function
	// to load it,and the file that loads has explicitly define the module name, then we no longer need this anonymous
	// definition since the name was explicitly defined.
	me.define.anonymous.reset();
};

// Whether or not to enforce the use of AMD. If this setting it turned on via the `config` `Function`, any library that
// supports AMD will not longer be available via the `window` `global`. See documentation for further details.
me.define.amd = undefined;

// If a module is sitting in an anonymous state and waiting to be imported properly, this function will take the
// `dependencies` and `factory` from that anonymous module, import them in to our properly named module, and then
// destroy the anonymous module sitting in a limbo state. Here's how this system of defining anonymous modules works:
// If we attempt to load a module via our `require` function, and that module doesn't happen to exist in our
// configuration, we'll automatically spawn a new anonymous module for it. Once the file for the module has loaded, if
// the file contains an anonymous `define` call, we'll then store it in a limbo state with it's `factory` and
// `dependencies`. The issue is that the `define` function will be invoked before the `onload` callback from our
// script file that was loaded for our module, so we have to store it in a limbo state, and then after the callback
// executes, we then look to see if an anonymous module is waiting to be defined, if so, we then define it whatever
// anonymous module that's sitting in a limbo state with the name of the module that was given from our callback. If
// our callback provides a `define` function with a name, any anonymous modules sitting in a limbo state will be wiped
// out completely.
me.define.anonymous = function(moduleName) {
	// If we don't have a anonymous module waiting to be defined, then halt the function. We should at the very least have
	// either a `factory` or reference to the last defined module (which in this case would be our anonymous module
	// without a name).
	if (!me.isDefined(me.define.anonymous.factory) && !me.define.module.last) {
		return;
	}

	// Fetch the instance of our module.
	var module = me.module(moduleName, null, false);

	// If we couldn't find our module, then something went wrong. Let the end user know and halt the `Function`.
	if (!module) {
		me.log(1, 'define', 'anonymous', 'Anonymous module not found for `' + moduleName + '`! Halting definition!');
		return;
	}

	// If our module already exists and there's a module that's set as our last defined, then a file was loaded which the
	// library assumed was anonymous, but wound up being explicitly calling the `define` `Function` with a `name`. In this
	// particular case, we'll destroy the new definition and instead alias it with our anonymous module.
	if (module && me.define.module.last) {
		// Define the alias coming from the `define` function for the anonymous file that was loaded.
		me.module.alias(module.name, [me.define.module.last.name]);

		// Attempt to fetch the index of our anonymous module from our require library.
		var anonymousIndex = me.indexOf(me.require.anonymous, moduleName);

		// Reference the factory from the file that was loaded if the current factory is `undefined`.
		if (anonymousIndex !== -1) {
			// Remove the anonymous entry.
			me.require.anonymous.splice(anonymousIndex, 1);

			// Reference the factory.
			module.factory = me.define.module.last.factory;
		}

		// Delete the actually module reference.
		delete me.module.definitions[me.define.module.last.name];
	} else {
		// Set the dependencies for our anonymous `module`.
		module.deps = me.define.anonymous.deps;

		// Set the factory for our anonymous `module`.
		module.factory = me.define.anonymous.factory;
	}

	// Reset the pending anonymous values waiting to be populated.
	me.define.anonymous.reset();
};

// The dependencies for our anonymous `module` waiting to be properly defined.
me.define.anonymous.deps = undefined;

// The factory for our anonymous `module` waiting to be properly defined.
me.define.anonymous.factory = undefined;

// Clear out any saved anonymous `module` properties.
me.define.anonymous.reset = function() {
	// Clear the dependencies.
	me.define.anonymous.deps = undefined;

	// Clear the factory.
	me.define.anonymous.factory = undefined;
};

// Store the anonymous module waiting to be defined.
me.define.anonymous.save = function(args) {
	// Remove the reference for our last defined module.
	me.define.module.last = null;

	// Reset the previously saved values if present.
	me.define.anonymous.reset();

	// If the `args` parameter isn't an `Object`, halt the `Function`.
	if (!me.isObject(args)) {
		return;
	}

	// Set the dependencies for our anonymous module.
	if (me.isDefined(args.deps)) {
		me.define.anonymous.deps = args.deps;
	}

	// Set the factory for our anonymous module.
	if (me.isDefined(args.factory)) {
		me.define.anonymous.factory = args.factory;
	}
};

// Handle the arguments for our define function in a special way. In certain cases only 1, 2 or 3 parameters may be
// passed to the `Function`. This `Function` will determine what those parameters should be defined as.
me.define.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.arrayClone(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
		deps: null,
		error: null,
		factory: null,
		name: null
	};

	// If we have no arguments, halt our function.
	if (!args.length) {
		return payload;
	}

	// If we only got a single argument, treat it as the factory.
	if (args.length === 1) {
		payload.factory = args[0];

		return payload;
	}

	// If we have 2 arguments, then there's some special checks here.
	if (args.length === 2) {
		// The last parameter in this case will always be our factory.
		payload.factory = args[1];

		// If our first argument happens to be a string, treat it as the name.
		if (me.isString(args[0])) {
			payload.name = args[0];

			return payload;
		}

		// If our first argument wasn't a string, treat it as the `deps` or discard it.
		payload.deps = me.isArray(args[0]) ? args[0] : null;

		return payload;
	}

	// If we have 3 or more arguments, reference the first 3 properly.
	payload.deps = args[1];
	payload.factory = args[3];
	payload.name = args[0];

	// Return our normalized payload of parameters.
	return payload;
};

// Fill up our dependencies based on our arguments if we need to.
me.define.deps = function(args) {
	// If we already have our dependencies defined, then skip the function.
	if (args.deps) {
		return args;
	}

	// If our factory isn't a function, and our dependcies are empty, then we have no dependencies.
	if (!me.isFunction(args.factory)) {
		args.deps = [];
		return args;
	}

	// If we made it this far, set the arguments from our factory as our dependencies.
	args.deps = me.args(args.factory);

	// Send back our arguments array with our populated dependencies.
	return args;
};

// Generate and return our new module.
me.define.module = function(args) {
	// Generate the module.
	return me.module.define(args.name, {
		// Set our dependencies.
		deps: args.deps,

		// Set our factory.
		factory: args.factory,

		// Explicity flag that the module has been loaded, that way when we reference it, we don't attempt to load it.
		loader: {
			loaded: true
		}
	});
};

// Our last defined module reference. This is used to reference the proper names with our anonymous modules.
me.define.module.last = null;

/*global me*/

// The loader object handles asynchronously loading of all the files for the library. It acts as a middle man between
// the `require` function and our loader libraries. Loader libraries for example being `loaderImage.js`,
// `loaderStylesheet.js` and `loaderJavaScript.js`. Those individual libraries are treated as non-logic based loaders.
// Their sole purpose is to simply load a specific URL, then let us know whether it load successfully or not. Any and
// all logic which performs trying additional fallbacks and checks lives within the loader object.
me.loader = {};

// Initialization function for our loader object.
me.loader.init = function() {
	// Automatically configure our library via attributes being set on any `script` elements on the page.
	me.loader.init.autoloader();

	// Flag that our loader has been initialized.
	return me.loader.inited = true;
};

// If the attributes `base` or `data-base` are found on any of the `script` tags within the page when the library is
// loaded, automatically set the `base` variable for our configuration to that `value`. If the attributes `main` or
// `data-main` are found on any of the `script` tags when the library is loaded on the page, automatically load up that
// `value` as a module. If the `value` is a comma delimited string, we'll split on the comma and load each separately.
me.loader.init.autoloader = function() {
	// Fetch `base` and/or `data-base`.
	var base = me.normalizeStringSeries(me.loader.js.attributes('base'));

	// If our `attribute` exists, then configure it.
	if (base.length) {
		// Since `me.autoloader` will return an `Array` series, only use the first value of our `Array`.
		me.config({
			base: base.shift()
		});
	}

	// Fetch `main` and/or `data-main`.
	var main = me.normalizeStringSeries(me.loader.js.attributes('main'));

	// If our `attribute` exists, then `require` it.
	if (main.length) {
		me.require(main);
	}
};

// Attempt to load our module.
me.loader.boot = function(moduleName, callback) {
	// Fetch the instance of our module.
	var module = me.module(moduleName);

	// If our module is already loaded, then skip the loading process and hit the callback.
	if (module.loader.loaded === true) {
		callback();
		return;
	}

	// Push our callback to the queue.
	module.callbacks.push(callback);

	// If this module is currently in the process of being loaded, queue our callback and skip processing.
	if (module.loader.working === true) {
		return;
	}

	// If we made it this far, we need to actually process the module in question.
	module.loader.working = true;

	// Set our start time for statistics.
	module.loader.timeStart = new Date().getTime();

	// Setup our temporary variables to use for our working URLs.
	module.loader.workingURLs = me.arrayClone(module.urls);

	// Make sure to clone our URLs array as we're going to be manipulating it.
	me.loader.urls(module);
};

// Load the URLs passed in for the module in question. This will run a loop through each of the URLs, attempting to
// load one at a time, only stopping when either all URLs have been exhausted or a URL has loaded successfully. Other
// specific checks that determine whether or not a library was actually loaded properly are defined within the loader
// scripts themselves.
me.loader.urls = function(module) {
	// Reference our working URLs.
	var urls = module.loader.workingURLs;

	// If we've exhausted all URLs available for the module, then the library has failed to load.
	if (!urls.length) {
		return me.loader.urls.failed(module);
	}

	// Shift our URL off of the `Array`, that way if we have to loop around, we don't retry the same URL again.
	var url = urls.shift();

	// Throw a log message to the end user.
	me.log(3, 'loader', 'Requesting to load `' + module.name + '` via `' + url + '`');

	// Call upon our specific loader script to load our URL.
	me.loader[module.identity].boot(module, url, me.loader.urls.success, me.loader.urls.failed);
};

// Common operations to perform whether a module loaded successfully or not.
me.loader.urls.completed = function(module) {
	// Flag our module has having already attempted to load.
	module.loader.loaded = true;

	// Set our end time for statistics.
	module.loader.timeEnd = new Date().getTime();

	// Flag our module as no longer in a working/in progress state.
	module.loader.working = false;

	// Fire off all of our callbacks.
	me.module.callbacks(module.name);
};

// When a URL or module fails to load this function will be called.
me.loader.urls.failed = function(module, url) {
	// Legacy IE fires off the failed callback more than once, so we'll double check to see if we've already fired it. @ie
	if (me.indexOf(module.loader.failed, url) !== -1) {
		return;
	}

	// Setup our log message that we'll send to the end user.
	var message = '`' + module.name + '` failed to load ';

	// If there's no URL, then all URLs have been exhausted!
	if (!url) {
		me.loader.urls.completed(module);
		me.log(2, 'loader', message + 'module.');
		return;
	}

	// Reset the anonymous module name.
	me.define.anonymous.reset();

	// Let the end user know which specific URL failed to load.
	module.loader.failed.push(url);
	me.log(3, 'loader', message + ' for URL: ' + url);

	// Try the next URL in our URLs list.
	me.loader.urls(module);
};

// When a URL loads sucessfully this function will be called.
me.loader.urls.success = function(module, url, status, factory) {
	// We're going to store the name of the module we're attempting to load here. This way if the file that's loaded
	// happens to call the `define` function with an anonymous name, this is the name that we'll use for the definition.
	me.define.anonymous(module.name);

	// If our library was already loaded, we don't know what URL was successful, so we'll skip setting it.
	if (status === 'predefined') {
		me.log(3, 'loader', '`' + module.name + '` already loaded on the page; referencing.');
	} else {
		module.loader.success = url;
		me.log(3, 'loader', '`' + module.name + '` loaded successfully `' + url + '`.');
	}

	// If we have a `init` function, we'll run it now.
	if (me.isFunction(module.init)) {
		module.init();
	}

	// If we don't have a factory for our module, then there was no definition. Regardless of what our value is we'll
	// reference it here.
	if (!me.isDefined(module.factory)) {
		module.factory = factory;
		module.invoked = true;
	}

	// Wrap up the loader process and handle our callbacks.
	me.loader.urls.completed(module);
};

/* global me */

// Image loader which is responsible for loading any images for the library.
me.loader.img = {};

// The image loader is pretty straight forward as legacy browser support goes way back, we don't need to perform any
// extra checking or manipulation.
me.loader.img.boot = function(module, url, callbackSuccess, callbackFailed) {
	// Create a new `img` element.
	var element = global.document.createElement('img');

	// If we get an `onerror` callback, the image failed to load.
	element.onerror = function() {
		// Remove the element from the page.
		me.loader.img.remove(element);

		// Process our failed callback.
		return callbackFailed(module, url);
	};

	// If we get an `onload` callback, the image loaded successfully.
	element.onload = function() {
		// Remove the element from the page.
		me.loader.img.remove(element);

		// In the case of images, the factory represents the URL.
		return callbackSuccess(module, url, 'success', url);
	};

	// Set the actual URL that we're going to request to load for our image.
	element.src = url;

	// Attempt to load the image on the page.
	return me.head.appendChild(element);
};

// Remove a dynamically generated element from the page.
me.loader.img.remove = function(element) {
	// If `element.remove` exists, use it.
	if (me.isFunction(element.remove)) {
		element.remove();
		return true;
	}

	// Legacy IE (IE < 9) doesn't have a `.remove` method. @ie
	if (me.isObject(element.removeNode)) {
		element.removeNode();
		return true;
	}

	// Return `false` if we weren't able to remove the element.
	return false;
};

/* global me */

// JavaScript loader which is responsible for loading any scripts for the library.
me.loader.js = {};

// Attempt to load a script onto the page.
me.loader.js.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already loaded on the page, don't attempt to reload it.
	var factory = me.loader.js.check(module, false);

	// Check if our module has already been loaded.
	if (factory) {
		return callbackSuccess(module, url, 'predefined', factory);
	}

	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url);
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		// Attempt to fetch the factory for our module.
		factory = me.loader.js.check(module);

		// If the factory is empty, then it failed to load! Invoke the failure callback.
		if (!me.isDefined(factory)) {
			return failed();
		}

		// We passed the checks, invoke the success callback.
		return callbackSuccess(module, url, 'success', factory);
	};

	// Spawn a new element on the page contained our URL with our callbacks.
	return me.loader.js.element(url, check, failed);
};

// Sift through the script elements on the page and attempt to derive the values from `attribute` that is passed in to
// the `Function`. Along with checking the `attribute` that is passed in, this `Function` will also prefix the
// given `attribute` with `data-` and check for that attribute as well. For example if the `Function` was called with
// `base`, then the `Function` will atempt to derive values for the attributes `base` and `data-base`.
me.loader.js.attributes = function(attribute) {
	// The `Array` to store our `attribute` values.
	var values = [];

	// If the `attribute` is not a string, halt the `Function`.
	if (!me.isString(attribute)) {
		return values;
	}

	// Fetch all script tags that are on the page.
	var scripts = global.document.getElementsByTagName('script');

	// Check to make sure that we retrieved a `HTMLCollection`, otherwise halt the `Function`.
	if (!me.isType(scripts, 'HTMLCollection')) {
		return values;
	}

	// Loop through each of our scripts.
	me.each(scripts, function(script) {
		// If our script instance isn't an `HTMLScriptElement`, then skip the iteration.
		if (!me.isType(script, 'HTMLScriptElement')) {
			return;
		}

		// If `getAttribute` isn't a `Function`, then we're not looking at a HTML element, skip it. For legacy IE the
		// `getAttribute` method is declared as `Object`.
		if (!me.isObject(script.getAttribute) && !me.isFunction(script.getAttribute)) {
			return;
		}

		// Check to see if our `attribute` exists along with the prefix `data-` for the `attribute` in questino.
		me.each([attribute, 'data-' + attribute], function(attribute) {
			// Store our attribute value.
			var value = null;

			// We need to wrap this in a try catch because we cannot properly detect the method in legacy browsers. @ie
			// Fetch the value for the attribute.
			try {
				// Fetch our attribute.
				value = script.getAttribute(attribute);
			} catch (exception) {}

			// If the value exists then use it.
			if (value) {
				// Split our value on `,` that way we can pass in multiple values.
				value = value.split(',');

				// Merge our values.
				values = values.concat(value);
			}
		});
	});

	// Return the values for attributes.
	return values;
};

// Check to see if a module has already been loaded on the page. This `Function` will return `Boolean`, `true` being
// that a module has already been loaded and `false` being that it hasn't.
me.loader.js.check = function(module, fallback) {
	// See if the module itself has been flagged as loaded.
	if (module.loader.loaded === true) {
		return true;
	}

	// If an anonymous moduel was defined, then it's for this library, meaning it loaded successfully.
	if (me.isDefined(me.define.anonymous.factory)) {
		return true;
	}

	// If the user added their own custom checking function, invoke it now to preform the check.
	if (me.isFunction(module.check)) {
		return module.check();
	}

	// If globals are enabled, and we have exports for the module, check the `window` to see if they're defined.
	if (me.globals === true && module.exports.length) {
		return me.loader.js.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return me.isDefined(fallback) ? fallback : true;
};

// Check for the instance of our library based on the exports given. If the instance of our library exists it'll be
// returned, otherwise this function will return `null. The `Function` basically checks the `window` variable for a
// subkey which are the exports that are specified in the paramter.
me.loader.js.check.exports = function(exports) {
	// If our `exports` parameter is not an `Array`, cast it to one.
	if (!me.isArray(exports)) {
		exports = [exports];
	}

	// Storage for our factory value.
	var factory = null;

	// If we have no exports, return `null`.
	if (!exports.length) {
		return factory;
	}

	// Loop through each of our exports variable, until we find a match.
	me.each(exports, function(variable) {
		// We have to explicity use `eval` because variables will come in many forms. In particular sometimes they will come
		// in the form of being a child of an object. For example `jQuery UI` loads under the `glboal` variable `jQuery.ui`.
		// In order for us to get to this programtically we have to use `eval`.
		try {
			/*eslint-disable*/
			factory = eval('window.' + variable);
			/*eslint-enable*/

			// If our `factor`y is undefined, force the variable back to a `null`.
			if (!me.isDefined(factory)) {
				factory = undefined;
			}
		} catch (exception) {
			// Let the end user know that we hit an exception due to their malformed `exports` variable.
			me.log(2, 'loaderJavaScript', '`fallback.loader.js.check.exports` threw an exception.', exception);
		}
	});

	// Return the factory for our library.
	return factory;
};

// Spawn a new element on the page with our URL.
me.loader.js.element = function(url, success, failed) {
	// Create a new script element instance.
	var element = global.document.createElement('script');

	// The browser supports it, enable crossorigin.
	element.crossorigin = true;

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = success;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events. @ie
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			success();
		}
	};

	// Set the actual URL that we're going to request to load for our library.
	element.src = url;

	// Set the type, some legacy browsers require this attribute be present.
	element.type = 'text/javascript';

	// Load our URL on the page.
	return me.head.appendChild(element);
};

/* global me */

// Cascading Stylesheet loader which is responsible for loading any CSS files for the library.
me.loader.css = {};

// Attempt to load a stylesheet onto the page.
me.loader.css.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the stylesheet is already loaded on the page, don't attempt to reload it.
	var factory = me.loader.css.check(module, false);

	// Check if our module has already been loaded.
	if (factory) {
		return callbackSuccess(module, url, 'predefined', factory);
	}

	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url);
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		// Attempt to fetch the factory for our module.
		factory = me.loader.css.check(module);

		// If the factory is empty, then it failed to load! Invoke the failure callback.
		if (!factory) {
			return failed();
		}

		// We passed the checks, invoke the success callback.
		return callbackSuccess(module, url, 'success', factory);
	};

	// Spawn a new element on the page contained our URL with our callbacks.
	return me.loader.css.element(url, check, failed);
};

// Check to see if a module has already been loaded on the page. This `Function` will return `Boolean`, `true` being
// that a module has already been loaded and `false` being that it hasn't.
me.loader.css.check = function(module, fallback) {
	// See if the module itself has been flagged as loaded.
	if (module.loader.loaded === true) {
		return true;
	}

	// If the user added their own custom checking function, invoke it now to preform the check.
	if (me.isFunction(module.check)) {
		return module.check();
	}

	// If globals are enabled, and we have exports for the module, check the DOM to see if they're defined.
	if (me.globals === true && module.exports.length) {
		return me.loader.css.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return me.isDefined(fallback) ? fallback : true;
};

// Check for the instance of our library based on the exports given. If the instance of our library exists it'll be
// returned, otherwise this function will return `null. The `Function` basically checks the `window` variable for a
// subkey which are the exports that are specified in the paramter.
me.loader.css.check.exports = function(exports) {
	// If our `exports` parameter is not an `Array`, cast it to one.
	if (!me.isArray(exports)) {
		exports = [exports];
	}

	// Storage for our factory value.
	var factory = null;

	// If we have no exports, return `null`.
	if (!exports.length) {
		return factory;
	}

	// Case all of our exports to lowercase as some browsers automatically change them.
	var normalized = [];

	me.each(exports, function(exportName) {
		normalized.push(exportName.toLowerCase());
	});

	// Swap our exports `Array` out with out normalized lowercase `Array`.
	exports = normalized;

	// If the `global.document` doesn't contain the key `styleSheets`, return `null`.
	if (!me.isDefined(global.document.styleSheets)) {
		return factory;
	}

	// Loop through each of the documents stylesheets.
	me.each(global.document.styleSheets, function(stylesheet) {
		// If the stylesheet is `0`, skip it.
		if (stylesheet === 0) {
			return true;
		}

		// Loop through the following keys in `global.document.stylesheets`.
		me.each(['cssRules', 'rules'], function(key) {

			// This has to be wrapped in a `try catch` due to some browsers throwing a CORS exception if the stylesheet is
			//loaded via an external domain.
			try {
				// If `stylesheet.rules` exists, scan it for our export.
				if (me.isDefined(stylesheet[key])) {
					factory = me.loader.css.scan(stylesheet[key], exports);

					// If we found our rule, halt the loop.
					if (factory) {
						return false;
					}
				}
			} catch (exception) {
				me.log(2, 'loaderStylesheet', '`fallback.loader.css.check.exports` threw an exception.', exception);
			}
		});

		// If we found our selector, halt the loop!
		if (factory) {
			return false;
		}
	});

	// Return whether or not our stylesheet was loaded.
	return factory;
};

// Spawn a new element on the page with our URL.
me.loader.css.element = function(url, success, failed) {
	// Create a new script element instance.
	var element = global.document.createElement('link');

	// The browser supports it, enable crossorigin.
	element.crossorigin = true;

	// Set the actual URL that we're going to request to load for our library.
	element.href = url;

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = success;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events. @ie
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			success();
		}
	};

	// Set the type, some legacy browsers require this attribute be present.
	element.rel = 'stylesheet';

	// Load our URL on the page.
	return me.head.appendChild(element);
};

// Scan through the documents stylesheets searching for a specific selector.
me.loader.css.scan = function(ruleset, selectors) {
	// Store whether or not we found our selector.
	var found = false;

	// Loop through the rules.
	for (var index in ruleset) {
		var rule = ruleset[index];

		// See if we find a match for one of our selectors.
		if (me.indexOf(selectors, String(rule.selectorText).toLowerCase()) !== -1) {
			// Flag that we found our selector.
			found = true;

			// Halt the loop.
			break;
		}
	}

	// Return our search status.
	return found;
};

/* global me */

// Fetch an already existant module from our definitions. If the module in question doesn't exist then we'll generate
// it automatically unless the `generate` parameter is explicitly set to `false`. If a `module` is defined, then it's
// defaults will come out of whatever is contained in the `input` parameter.
me.module = function(moduleName, input, generate) {
	// Fetch our real module name, in the case that we're passed an alias.
	moduleName = me.module.named(moduleName);

	// If the module already exists, then return it.
	if (me.module.exists(moduleName)) {
		return me.module.definitions[moduleName];
	}

	// If we explicity stated not to generate our module, then stop here.
	if (generate === false) {
		return null;
	}

	// Generate and return our newly generated module.
	return me.module.define(moduleName, input);
};

// Store our aliases in a mapped `Object` that way it can be referenced easily.
me.module.alias = function(moduleName, aliases) {
	// Store the actual module name as an alias of itself.
	me.module.aliases[moduleName] = moduleName;

	// Normalize our incoming aliases.
	aliases = me.normalizeStringSeries(aliases);

	// If no alias were passed in, then halt our function.
	if (!aliases.length) {
		return;
	}

	// Fetch our module so we can add our aliases to it.
	var module = me.module(moduleName, null, false);

	// Loop through each of our aliases and store them.
	me.each(aliases, function(alias) {
		// If the alias already exists, notify the end user before overwriting it.
		if (me.isDefined(me.module.aliases[alias])) {
			me.log(2, 'module', 'Module alias `' + alias + '` already exists for `' + me.module.aliases[alias] + '`! Overwriting!');
		}

		// Reference our alias.
		me.module.aliases[alias] = moduleName;

		// If we don't aleady have an alias stored in our modules aliases, then add it.
		if (me.indexOf(module.alias, alias)) {
			module.alias.push(alias);
		}
	});
};

// An `Object` of aliases mappings where the `key` is the alias and the `value` is the `module` that the alias is for.
me.module.aliases = {};

// Fetch the base URL for the current identity being passed in.
me.module.base = function(identity) {
	// If our `base` variable is null/empty, return null.
	if (!me.base) {
		return null;
	}

	// If our `base` variable is a string, then return it.
	if (me.isString(me.base)) {
		return me.base;
	}

	// If no identity was given them revert to our fallback.
	if (!identity) {
		identity = me.module.identify.fallback;
	}

	// If a base URL exists for the identity, then return it.
	if (me.isDefined(me.base[identity]) && me.base[identity]) {
		return me.base[identity];
	}

	// No base URL was found.
	return null;
};

// Process all pending callbacks that are queued for a specific module.
me.module.callbacks = function(moduleName) {
	// Fetch the reference to our module.
	var module = me.module(moduleName, null, false);

	// If there are no callbacks, then halt the `Function`.
	if (!me.isArray(module.callbacks) || !module.callbacks.length) {
		return;
	}

	// Loop through end invoke each of the callbacks.
	me.each(module.callbacks, function(callback, index) {
		// Invoke the callback.
		callback();

		// Remove the callback from the queue.
		delete module.callbacks[index];
	});
};

// Define a new module and normalize the `input`. This `Function` will override a module if it already exists with the
//  same name unless the `noOverride` parameter is explicity set to `true`.
me.module.define = function(moduleName, input, noOverride) {
	// If a module with the `moduleName` already exists, fetch the actual name of the module in case we have an alias.
	moduleName = me.module.named(moduleName);

	// If the module already exists, determine whether or not to override it.
	if (me.module.exists(moduleName)) {
		// If we explicity state not to override an existing module, then halt the function.
		if (noOverride === true) {
			return null;
		}

		// Let the end user know that we're overriding a module.
		me.log(2, 'module', 'Module `' + moduleName + '` already exists! Overwriting!');
	}

	// Force our input to an `Object`.
	if (!me.isObject(input)) {
		input = {};
	}

	// Normalize our `input` parameter.
	var normalized = me.module.define.normalize(moduleName, input);

	// Store the definition reference of our module.
	var module = me.module.definitions[moduleName] = normalized;

	// Import the aliases for our module.
	me.module.alias(moduleName, normalized.alias);

	// Return our newly defined module.
	return module;
};

// Normalize the `input` data for a new module.
me.module.define.normalize = function(moduleName, input) {
	// Fetch the defaults for a module.
	var defaults = me.module.define.defaults();

	// Storage for `input` after it's been normalized.
	var normalized = {};

	// Loop through the top level and loader sublevels of our `input` and `defaults`.
	me.each(['', 'loader'], function(inputKey) {
		// The reference to the level of our defaults that we're normalizing in this iteration.
		var payload = defaults;

		// If the `inputKey` isn't empty, then we're normalizing a sublevel. Adjust the payload's reference.
		if (inputKey) {
			normalized[inputKey] = {};
			payload = payload[inputKey];
		}

		// Loop through our defaults.
		me.each(payload, function(values, key) {
			// By default set the value to whatever was passed in to our function.
			var value = input[key];

			// If our `values` is an `Array`, then run the normalization function on the input value.
			if (me.isArray(values)) {
				value = values[0](value, values[1]);
			}

			// If the `inputKey` isn't empty, store the `value` in our sublevel of our normalized `Object`.
			if (inputKey) {
				normalized[inputKey][key] = value;
				return;
			}

			// Store the value at the top level of our normalized `Object`.
			normalized[key] = value;
		});
	});

	// Forcefully set the module name within the `Object`.
	normalized.name = moduleName;

	// Store the identity of our module now, so that we may reference it later.
	normalized.identity = me.module.identify(moduleName);

	// Normalize all of the URLs for the module now and store them in a normalized state.
	normalized.urls = me.module.urls(normalized.identity, normalized.urls);

	// Return our normalized input.
	return normalized;
};

// The following are our defaults that we'll use to normalize our data when defining a new module. The values of this
// `Object` are `Array` based. The first parameter of the `Array` is the `Function` that we'll use to normalize the
// value, the 2nd parameter is the fallback value that we'll use. For example: `alias: [me.normalizeStringSeries, []]`
// will run the `me.normalizeStringSeries` on the value of `alias`, and if the value is malformed, the value will be
// set to `[]`. If the value in our `defaults` `Object` is not an `Array`, then it will be skipped/ignored from the
// normalization loop.
me.module.define.defaults = function() {
	return {
		// Aliases for the module.
		'alias': [me.normalizeStringSeries, null],

		// We store our callbacks here for processing after our library has finished loading.
		'callbacks': [me.normalizeFunctionSeries, null],

		// Custom check function to determine whether or not our library has loaded properly.
		'check': [me.normalizeFunction, null],

		// Dependencies for the module.
		'deps': [me.normalizeStringSeries, null],

		// An error `Function` which will be called if the library or it's dependencies fail to load.
		'error': [me.normalizeFunction, null],

		// Exports for the module that we'll check the global scope for to see if the module loaded properly.
		'exports': [me.normalizeStringSeries, null],

		// The identity of the module, for example: `css`, `img`, or `js`.
		'identitiy': [me.normalizeString, null],

		// If the factory of the module is a function, it'll be invoked upon it's first require then that state will be
		// saved. This flags whether or not the factory was invoked and saved.
		'invoked': [me.normalizeBoolean, false],

		// The value of our module. It's value can be anything, example: `Array`, `Function`, `HTMLElement`, `Object`,
		// `String`, etc.
		'factory': null,

		// Must be either `null` or a `Function`. As soon as module is first used/referenced, this `Function` will
		// immediately be called upon if present.
		'init': [me.normalizeFunction, null],

		// Any loader data for the module will be stored here.
		'loader': {
			// Any URLs that failed to load will be stored here.
			'failed': [me.normalizeStringSeries, null],

			// Whether or not we actually attempted to load this module.
			'loaded': [me.normalizeBoolean, false],

			// If a URL loaded sucecssfully, it will be stored here.
			'success': [me.normalizeString, null],

			// The time that a module finished loading.
			'timeEnd': [me.normalizeNumber, null],

			// The time that a module initiated it's load sequence. This includes all loading for the module in question. For
			// example if a library had 3 fallback URLs, and the first 2 failed due to timeouts, and the 3rd was successful,
			// this variable would reflect the current time prior to the first 2 URLs failing.
			'timeStart': [me.normalizeNumber, null],

			// Flags whether or not the module is currently in the process of loading.
			'working': [me.normalizeBoolean, false]
		},

		// Where all the URLs are stored for our module.
		'urls': [me.normalizeStringSeries, null],

		// The version of our module.
		'version': [me.normalizeString, null]
	};
};

// All our module definitions will be stored and referenced through this `Object`. The keys of this `Object` correlate
// to the modules actual name.
me.module.definitions = {};

// Fetch the dependencies for an `Array` of modules that passed in. If `findNestedDependencies` is explicitly set to
// `true`, then the `Function` will run a loop and fetch the full dependecy tree for all of the modules until all
// dependencies have been exhausted and added to the queue.
me.module.dependencies = function(modules, findNestedDependencies) {
	// Store our queue of dependency modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If the module doesn't exist, or there aren't any dependencies, skip the iteration.
		if (!module || !module.deps.length) {
			return;
		}

		// Queue our dependencies.
		queue = queue.concat(module.deps);

		// If we explicity want a loop of all our dependencies, then we'll trace through them here.
		if (findNestedDependencies === true) {
			queue = queue.concat(me.module.dependencies(module.deps, findNestedDependencies));
		}
	});

	// Return all of our queued dependency modules.
	return queue;
};

// Check to see whether a module exists by name.
me.module.exists = function(moduleName) {
	// Search the definitions `Object`.
	if (me.isDefined(me.module.definitions[me.module.named(moduleName)])) {
		return true;
	}

	// No module found.
	return false;
};

// Identify the type of module that we have. Example: CSS, Image, JavaScript, etc.
me.module.identify = function(moduleName) {
	// If we can't identify the module, use our fallback.
	var fallback = me.module.identify.fallback;

	// If no `moduleName` was passed in, return the fallback.
	if (!moduleName) {
		return fallback;
	}

	// Split the `moduleName` on our `delimiter` which is derived from our configuration.
	var split = moduleName.split(me.delimiter);

	// If we can't find our delimiter, then return our fallback.
	if (split.length < 2 || me.indexOf(me.module.identify.types, split[0]) === -1) {
		return fallback;
	}

	// Return our modules identity.
	return split[0];
};

// The identifier to fallback on if we cannot find a match.
me.module.identify.fallback = 'js';

// The support identifier types.
me.module.identify.types = ['css', 'img', 'js'];

// Invoke and return the invoked instance of the `factory` for our `module`, if the `factory` happens to be a
// `Function`. If the `factory` is not a `Function`, we'll simply return whatever value is set for the `factory.
me.module.invoke = function(moduleName) {
	// Fetch the instance of our `module`.
	var module = me.module(moduleName, null, false);

	// If we couldn't fetch an instance of our `module`, something went wrong, relay a message to the end user.
	if (!module) {
		me.log(1, 'Module wasn\'t found!', moduleName);
		return null;
	}

	// If the module hasn't already been invoked, then invoke it.
	if (!module.invoked) {
		// Flag the module as invoked, so we don't run through this step again.
		module.invoked = true;

		// Reference the instance of our invoked `factory` as the `factory` value for the module.
		module.factory = me.module.invoke.factory(module.factory, module.deps);
	}

	// Return the invoked `factory` instance of the module.
	return module.factory;
};

// Invoke a `factory` with the arguments being the dependencies that are passed in via the `deps` parameter.
me.module.invoke.factory = function(factory, deps) {
	// If the `factory` passed in is not a `Function`, then simply return it's current value.
	if (!me.isFunction(factory)) {
		return factory;
	}

	// Invoke and return the invoked reference of our `factory`.
	return factory.apply(null, me.module.references(deps));
};

// Fetch the actual name of a module. If a modules alias is passed in, this `Function` will fetch the modules name.
me.module.named = function(moduleName) {
	// Fetch our actual module name, in the case that the `Function` was passed an alias.
	if (me.isDefined(me.module.aliases[moduleName])) {
		moduleName = me.module.aliases[moduleName];
	}

	// Return the module name.
	return moduleName;
};

// Invoke an `Array` of modules, and return each of their `factory` values in an `Array`.
me.module.references = function(modules) {
	// Store a list of our `factory` references.
	var references = [];

	// If no `modules` were passed into the `Function`, then simply return an empty `Array`.
	if (!modules.length) {
		return references;
	}

	// Loop through and invoke each of our modules.
	me.each(modules, function(module) {
		// Push the `factory` off to our `references` `Array`.
		references.push(me.module.invoke(module));
	});

	// Return our set of modules references.
	return references;
};

// Normalize all of the URLs for our modules. This function will automatically prepend our base URLs and store them.
// This has a few benefits: we don't have to worry about processing the URLs later. We're able to store a snapshot
// of the current base URLs for the module in question, this way we can change our base URLs later and still maintain
// and use a different set of base URLs with other modules.
me.module.urls = function(identity, urls) {
	// Fetch the base URL for our module.
	var base = me.module.base(identity);

	// Store our extension string.
	var extension = '.' + identity;

	// Store our set of normalized URLs that we'll reference.
	var normalizedUrls = [];

	// Loop through each of the URLs.
	me.each(urls, function(url) {
		// If the URL we're examining doesn't have an extension then automatically add it. If the `identity` of the module
		// happens to be an image, then the user must pass in an extension. We cannot assume the extension of image files
		// types, but we can for CSS and JavaScript files.
		if (identity !== 'img' && url.substr(-extension.length) !== extension) {
			url += extension;
		}

		// If we have a `base` URL, then do the following.
		if (base) {
			// Flag whether or not a URL should be ignore from being prepended with the base URL.
			var isIgnored = false;

			// Loop through our ignore list.
			me.each(me.module.urls.ignore, function(ignorer) {
				// Check to see if the prefix of our URL has a match in our ignore list.
				if (url.substr(0, ignorer.length) === ignorer) {
					// Flag the URL as ignored.
					isIgnored = true;

					// Halt the loop.
					return false;
				}
			});

			// If the URL isn't prefixed with a match from our ignore list, then prepend the base URL.
			if (!isIgnored) {
				url = base + url;
			}
		}

		// Push the normalized URL off to our list.
		normalizedUrls.push(url);
	});

	// Return the set of our normalized URLs.
	return normalizedUrls;
};

// URL prefixes to specifically ignore from prepending with our base URL.
me.module.urls.ignore = ['/', 'data:', 'http://', 'https://'];

/* global me */

// Load up and invoke our modules along with all of their dependencies. This function will first find all dependencies
// for our modules and then attempt to load and invoke them from least to most dependent. This procedure needs to
// happen in 2 separate operations due to the possibility of anonymous modules having their own dependencies that we
// don't actually know about until after we've loaded it's file.
me.require = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.require.args.apply(null, arguments);

	// Boot up our dependencies.
	me.require.boot(args.deps, function() {
		// At this point all of our dependencies have loaded, now we need to go ahead and invoke all of our dependencies in
		// an order from least to most dependent, that way our initial `require` being requested can be invoked.
		me.require.invoke(args.deps);

		// Invoke our `factory` function with it's required dependency references.
		me.module.invoke.factory(args.factory, args.deps);
	});
};

// Load up all of our dependencies, along with any nested dependencies in the order of least to most dependent.
me.require.boot = function(modules, callback) {
	// If our `deps` argument was malformed or empty, invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		callback();
		return;
	}

	// Boot up our anonymous modules first. If we're booting, halt the function and we'll loop back around.
	if (me.require.boot.anonymous(modules, callback)) {
		return;
	}

	// Boot our dependencies.
	me.require.boot.dependencies(modules, callback);
};

// Check to see if there's any anonymous modules waiting to be loaded, if there is, then we'll load them.
me.require.boot.anonymous = function(modules, callback) {
	// Store our anonymous module that we need to load.
	var queue = me.require.boot.anonymous.queue(modules);

	// If we have any anonymous modules that we need to load, do it now, then loop back around.
	if (queue.length) {
		me.require.loop(queue, modules, callback);

		// Explicitly return `true` so that we don't halt the loop.
		return true;
	}

	// By returning `false` we'll halt the anonymous module loop check.
	return false;
};

// Check to see if we have any dependencies which are anonymous modules that've yet to be loaded.
me.require.boot.anonymous.queue = function(modules) {
	// Store our queue of anonymous modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If our module doesn't exist, then it's a anonymous module that we need to load up first to find out what
		// dependencies are actually required for it.
		if (!module) {
			// Push the module off to our anonymous list.
			me.require.anonymous.push(moduleName);

			// Setup the configuration for our anonymous module.
			me.require.config(moduleName);

			// Push the module off to our queue.
			queue.push(moduleName);

			// Don't pass this point, as we can't figure out the dependencies for our module yet.
			return;
		}

		// Loop and find any dependencies that are anonymous modules as well and queue them.
		queue = queue.concat(me.require.boot.anonymous.queue(module.deps));
	});

	// Return all of our queued anonymous modules.
	return queue;
};

// Load up all of the dependencies for the modules that are passed in.
me.require.boot.dependencies = function(modules, callback) {
	// Fetch all of the dependencies for our modules.
	var dependencies = me.module.dependencies(modules);

	// Loop around until we find the start of our dependency tree.
	if (dependencies.length) {
		// If we have dependencies, we're not at the start of the tree, keep looping around.
		return me.require.boot(dependencies, function() {
			// Load the modules.
			me.require.module(modules, function() {
				// Fetch the dependencies for our modules again.
				var newDependencies = me.module.dependencies(modules);

				// Determine if there are any new dependencies, since we've loaded our set of modules.
				if (newDependencies.join() !== dependencies.join()) {
					// Load up our new dependencies.
					return me.require.boot(newDependencies, function() {
						// Loop back around to see if any new dependencies have loaded from our set of newly loaded dependencies.
						me.require.module(modules, callback);
					});
				}

				// If we didn't have any new dependencies, then run our callback.
				callback();
			});
		});
	}

	// Load the start of our dependency tree.
	me.require.module(modules, callback);
};

// Fetch and normalize the arguments that are passed into our `require` function. The arguments for our `require`
// function can be sent in a number of different forms such as:
// (dependency) - Where `dependency` is a `String`.
// (dependencies) - Where `dependency` is a `Array`.
// (factory) - Where `factory` is a `Function`.
// (dependency, factory) - Where `dependency` is a `String` and `factory` is a `Function`.
// (dependencies, factory) - Where `dependencies` is a `Array` and `factory` is a `Function`.
me.require.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.arrayClone(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
		error: null,
		deps: null,
		factory: null
	};

	// If we only have a single argument, and it's a function, derive our dependencies from it.
	if (args.length === 1 && me.isFunction(args[0])) {
		payload.deps = me.args(args[0]);
		payload.factory = args[0];

		return payload;
	}

	// If we made it this far, treat the first argument has our dependecies, and the 2nd has is our factory.
	payload.deps = me.normalizeStringSeries(args[0]);

	// If a 2nd argument is defined, treat it as our factory.
	if (me.isDefined(args[1])) {
		payload.factory = args[1];
	}

	// Return back our normalized arguments.
	return payload;
};

// List of anonymously required modules.
me.require.anonymous = [];

// Configure an anonymous module with a path and definition.
me.require.config = function(moduleName) {
	// If we don't have a `moduleName`, then the invocation was malformed. Halt the function.
	if (!moduleName) {
		return false;
	}

	// Create our `Object` that we'll pass to our configuration `Function`.
	var config = {
		libs: {}
	};

	// Set our URL to be relative to our configurations `base` variable.
	config.libs[moduleName] = moduleName;

	// Pass the anonymous module over to our configuration to generate the module and URLs.
	return me.config(config);
};

// Assumes that all depdendencies being passed into the `deps` parameter have already been loaded. The sole purpose of
// this `Function` is to simply invoke the factories for each of the dependencies if they haven't already been invoked.
me.require.invoke = function(deps) {
	// Fetch any dependencies of our dependencies.
	var dependencies = me.module.dependencies(deps, true);

	// Reverse our dependency list as our fetcher method loops through finding most to least dependent, we actually need
	// to invoke each `factory` from least to most dependent.
	dependencies.reverse();

	// Append our initial dependencies to the bottom of our list to be invoked last.
	dependencies = dependencies.concat(deps);

	// Loop through each of the dependencies in our list that we need to invoke.
	me.each(dependencies, function(dependency) {
		// Invoke our dependency.
		me.module.invoke(dependency);
	});
};

// Load up a queue of modules, then run `require.boot` to check and make sure all modules along with their dependencies
// have successfully loaded. This `Function` is being to used to exhaust all dependencies. In the case of anonymous
// modules, we may load up a file and find out we have new dependencies that must be loaded, this `Function` is taking
// care of that.
me.require.loop = function(queue, modules, callback) {
	// Load any modules in our queue.
	me.require.module(queue, function() {
		// Run back to `require.boot` and attempt to boot up the modules originally requested.
		me.require.boot(modules, callback);
	});
};

// Load up an `Array` of modules simultaneously.
me.require.module = function(modules, callback) {
	// If we have no `modules`, then invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		callback();
		return;
	}

	// Store an `Array` of functions that we'll run simultaneously.
	var queue = [];

	// Loop and queue each of our modules.
	me.each(modules, function(moduleName) {
		// Push our anonymous `Function` off to our parallel queue.
		queue.push(function(callback) {
			// Load the module onto the page.
			me.loader.boot(moduleName, callback);
		});
	});

	// Invoke the queue.
	me.parallel(queue, callback);
};

me.banner = '   ad88              88  88  88                                   88         88             \n  d8"                88  88  88                                   88         ""             \n  88                 88  88  88                                   88                        \nMM88MMM  ,adPPYYba,  88  88  88,dPPYba,   ,adPPYYba,   ,adPPYba,  88   ,d8   88  ,adPPYba,  \n  88     ""     `Y8  88  88  88P\'    "8a  ""     `Y8  a8"     ""  88 ,a8"    88  I8[    ""  \n  88     ,adPPPPP88  88  88  88       d8  ,adPPPPP88  8b          8888[      88   `"Y8ba,   \n  88     88,    ,88  88  88  88b,   ,a8"  88,    ,88  "8a,   ,aa  88`"Yba,   88  aa    ]8I  \n  88     `"8bbdP"Y8  88  88  8Y"Ybbd8"\'   `"8bbdP"Y8   `"Ybbd8"\'  88   `Y8a  88  `"YbbdP"\'  \n                                                                            ,88             \n                                                                          888P"';

me.homepage = 'http://fallback.io/';

me.version = '2.0.0';

me.init();

})(window);
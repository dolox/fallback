/* fallback.js v2.0.0 | http://fallbackjs.com/ | Salvatore Garbesi <sal@dolox.com> | (c) 2014 Dolox, Inc. */

(function(window) {

// The container variable for our library instance. As you browse through the libraries code you'll see the `me`
// variable referenced throughout, this is simply short-hand for the library.
var me = {};

// Initialize our library. This function must be invoked before we start using the library.
me.init = function() {
	// Reference the `head` element of our document and store it into memory.
	me.init.head();

	// Spawn our utility functions for the library.
	me.init.utilities(me.utility.types);

	// Reference aliases for the library into the `global` object for the user to directly access.
	me.init.aliases(me.aliases);

	// Automatically configure our library via attributes being set on any `script` elements on the page.
	me.init.autoloader();
};

// Reference the library's aliases into the `global` `Object` for the user to directly access. If a alias that we're
// attempting to reference currently exists in our `global` `Object`, then we won't override it.
me.init.aliases = function(input) {
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
			// If the alias is currently defined in the `global` object, skip it and throw a warning to the end user.
			if (me.isDefined(window[alias])) {
				me.warn('core', 'init', 'aliases', 'The variable global["' + alias + '"] already exists.');
				return;
			}

			// Map the alias to our module.
			me.module.alias(moduleName, alias);

			// Reference the alias of our module within the `global` `Object`.
			me.global[alias] = factory;
		});
	});
};

// If the attributes `base` or `data-base` are found on any of the `script` tags within the page when the library is
// loaded, automatically set the `base` variable for our configuration to that `value`. If the attributes `main` or
// `data-main` are found on any of the `script` tags when the library is loaded on the page, automatically load up that
// `value` as a module. If the `value` is a comma delimited string, we'll split on the comma and load each separately.
me.init.autoloader = function() {
	// Fetch `base` and/or `data-base`.
	var base = me.normalizeStringSeries(me.autoloader('base'));

	// If our `attribute` exists, then configure it.
	if (base.length) {
		// Since `me.autoloader` will return an `Array` series, only use the first value of our `Array`.
		me.config({
			base: base.shift()
		});
	}

	// Fetch `main` and/or `data-main`.
	var main = me.normalizeStringSeries(me.autoloader('main'));

	// If our `attribute` exists, then `require` it.
	if (main.length) {
		me.require(main);
	}
};

// Fetch the `head` element that resides on the page.
me.init.head = function() {
	// If the `head` element ever contains more than a single element, then the document is malformed.
	me.head = window.document.getElementsByTagName('head')[0];
};

// Automatically spawn helper functions that we'll use throughout the library. For example we're spawning the following
// functions: `isArray`, `normalizeArray`, `normalizeArraySeries`, etc. Spawning these functions this way results in
// less code for the library and achieves the same objective.
me.init.utilities = function(input) {
	// Loop through each of our different utility types.
	for (var index in input) {
		// Make sure it's not empty.
		if (input[index]) {
			// Spawn the utility function for the library.
			me.utility(me, input[index]);
		}
	}
};

// This is where we hold all of our functional aliases for the library.
me.aliases = {
	// Referenecs for our `config` function.
	config: ['cfg', 'conf', 'config'],

	// Referenecs for our `define` function.
	define: ['def', 'define'],

	// Referenecs for the library.
	me: ['fallback', 'fbk'],

	// Referenecs for our `require` function.
	require: ['req', 'require']
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
	return input.slice();
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

// Sift through the script elements on the page and attempt to derive the values from `attribute` that is passed in to
// the `Function`. Along with checking the `attribute` that is passed in, this `Function` will also prefix the
// given `attribute` with `data-` and check for that attribute as well. For example if the `Function` was called with
// `base`, then the `Function` will atempt to derive values for the attributes `base` and `data-base`.
me.autoloader = function(attribute) {
	// The `Array` to store our `attribute` values.
	var values = [];

	// If the `attribute` is not a string, halt the `Function`.
	if (!me.isString(attribute)) {
		return values;
	}

	// Fetch all script tags that are on the page.
	var scripts = window.document.getElementsByTagName('script');

	// Check to make sure that we retrieved a `HTMLCollection`, otherwise halt the `Function`.
	if (!me.isHTMLCollection(scripts)) {
		return values;
	}

	// Loop through each of our scripts.
	me.each(scripts, function(script) {
		// If our script instance isn't an `HTMLScriptElement`, then skip the iteration.
		if (!me.isHTMLScriptElement(script)) {
			return;
		}

		// Check to see if our `attribute` exists along with the prefix `data-` for the `attribute` in questino.
		me.each([attribute, 'data-' + attribute], function(attribute) {
			// Fetch the value for the attribute.
			var value = script.getAttribute(attribute);

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

// ASCII banner for the library.
me.banner = '   ad88              88  88  88                                   88         88             \n  d8"                88  88  88                                   88         ""             \n  88                 88  88  88                                   88                        \nMM88MMM  ,adPPYYba,  88  88  88,dPPYba,   ,adPPYYba,   ,adPPYba,  88   ,d8   88  ,adPPYba,  \n  88     ""     `Y8  88  88  88P\'    "8a  ""     `Y8  a8"     ""  88 ,a8"    88  I8[    ""  \n  88     ,adPPPPP88  88  88  88       d8  ,adPPPPP88  8b          8888[      88   `"Y8ba,   \n  88     88,    ,88  88  88  88b,   ,a8"  88,    ,88  "8a,   ,aa  88`"Yba,   88  aa    ]8I  \n  88     `"8bbdP"Y8  88  88  8Y"Ybbd8"\'   `"8bbdP"Y8   `"Ybbd8"\'  88   `Y8a  88  `"YbbdP"\'  \n                                                                            ,88             \n                                                                          888P"';

// All of our browser detection functions reside here. Some browsers have special edge cases that we need to cater to,
// and that's the sole purpose of these functions.
me.browser = {};

// Detect whether or not the current browser is IE11.
me.browser.isIE11 = function() {
	return Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;
};

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

// This is the global variable that we'll use to check whether a library was loaded or not. This variable can be
// overriden via the configuration `Function`.
me.global = window;

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

// Check to see if a variable is an HTMLCollection or NodeList.
// @reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
me.isHTMLCollection = function(variable) {
	return me.isType(variable, 'HTMLCollection') || me.isType(variable, 'NodeList');
};

// Check if a variable is a specific type.
me.isType = function(variable, type) {
	return Object.prototype.toString.call(variable) === '[object ' + type + ']';
};

// Logging function for when debugging is turned on. @todo use levels, instead of diff function names
me.error = me.log = me.warn = me.info = function() {
	// Make sure that both debugging is enable and what `window.console` exists.
	if (!me.debug || !window.console) {
		return;
	}

	var args = me.toArray(arguments);

	window.console.warn('%cFallbackJS: %c' + args.shift() + ': %c' + args.join(), 'font-weight: bold; color: #da542c', 'font-weight: bold; color: #000', 'color: #999');
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
		return fallback ? fallback : null;
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

	// Loop through eaach of our values.
	me.each(input, function(value) {
		// Normalize our value.
		value = me.normalize(value, type, fallback);

		// If strip is not explicity set in, and the `value` is falsey, it'll be removed from the normalized results. Falsey
		// translate to: `null`, `0`, `false`, `undefined`.
		if (strip !== false && !value) {
			return;
		}

		// Set our normalized value.
		normalized.push(value);
	});

	// Return our normalized series.
	return normalized;
};

// Constrain an object to only contain a specific set of keys. All other keys are discarded, and a warning is thrown.
me.objectConstrain = function(input, whitelist, reference) {
	// Store our normalized `Object`.
	var normalized = {};

	// Loop through our `Object`.
	me.each(input, function(value, key) {
		// If the `key` is not defined in the `whitelist`, then discard it.
		if (whitelist.indexOf(key) === -1) {
			// Throw a warning to the user that we've discarded the `key` in question.
			if (reference) {
				me.warn('core', 'objectConstrain', 'The key `' + key + '` is not allowed in `' + reference + '`, discarding.', input);
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
	// Our merge `Object`.
	var normalized = {};

	// The defaults to merge with.
	var defaultsIArray = me.isArray(defaults);

	// Loop through our defaults.
	me.each(defaults, function(value, key) {
		// If our `defaults` is an `Array` we need to swap out the key/values.
		if (defaultsIArray === true) {
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

	// Generate a unique identifier for our parallel instance to avoid collisions.
	var guid = me.guid();

	// Add the our `references` to our parallel queue.
	me.parallel.queue[guid] = {
		// The number of callbacks that were invoked.
		interval: 0,

		// The total number of callbacks to run in parralel.
		length: references.length
	};

	// Loop through all of our refernces and execute them.
	me.each(references, function(reference) {
		// Anonymous spawn and track our `Function` to invoke.
		me.parallel.anonymous(reference, guid, callback);
	});
};

// Our anonymous functions that we're executing in parallel.
me.parallel.anonymous = function(reference, guid, callback) {
	// Invoke our queued function.
	reference(function() {
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

// Container `Object` for all of the currently running parallel jobs.
me.parallel.queue = {};

// Output the configured libraries, their load times and other useful statistics for the end user. @todo
me.stats = function() {
	var separator = '\n' + Array(250).join('-') + '\n';
	var padding30 = Array(30).join(' ');
	var padding60 = Array(60).join(' ');

	var output = '\n' + me.banner;
	output += '\n' + me.stringPad('v' + me.version, padding60, true) + '\n';
	output += '\n' + me.stringPad('http://fallbackjs.com', padding60, true) + '\n';
	output += separator;
	output += me.stringPad('Library', padding60);
	output += me.stringPad('Type', padding30);
	output += me.stringPad('Time', padding30);
	output += me.stringPad('Loaded', padding30);
	output += me.stringPad('Invoked', padding30);
	output += me.stringPad('Failed', padding30);
	output += 'Success';
	output += separator;

	me.each(me.module.definitions, function(value, key) {
		var time = (value.loader.timeEnd - value.loader.timeStart) / 1000;
		time = time || time === 0 ? time + 's' : 'N/A';

		output += me.stringPad(key, padding60);
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
	if (!me.isDefined(input)) {
		return pad;
	}

	if (left) {
		return (pad + input).slice(-pad.length);
	}

	return (input + pad).substr(0, pad.length);
};

// Convert any `input` to an `Array`.
me.toArray = function(input) {
	return Array.prototype.slice.call(input);
};

// Automatically generate utility functions for our library. This library will generate the following functions:
// - isArray, normalizeArray, normalizeArraySeries
// - iBoolean, normalizeBoolean, normalizeBooleanSeries
// - isFunction, normalizeFunction, normalizeFunctionSeries
// - isHTMLScriptElement
// - isNumber, normalizeNumber, normalizeNumberSeries
// - isObject, normalizeObject, normalizeObjectSeries
// - isString, normalizeString, normalizeStringSeries
me.utility = function(object, type) {
	// Adding a function prefixed with `is` to check if a variable is actually the type that's being passed in.
	object['is' + type] = function(variable) {
		return me.isType(variable, type);
	};

	// We cannot generate normalize functions for the following types, so skip them.
	if (type === 'HTMLScriptElement') {
		return;
	}

	// Our normalization function.
	object['normalize' + type] = function(input, fallback) {
		return me.normalize(input, type, me.isDefined(fallback) ? fallback : null);
	};

	// Our normalization series function.
	object['normalize' + type + 'Series'] = function(input, fallback, strip) {
		return me.normalizeSeries(input, type, me.isDefined(fallback) ? fallback : [], strip);
	};
};

// The different utility types that we want to generate functions for.
me.utility.types = ['Array', 'Boolean', 'Function', 'HTMLScriptElement', 'Number', 'Object', 'String'];

/* global me */

// Configure the library. If the `input` is malformed then the `Function` will return `false`, otherwise the `Function`
// will return the normalized value that was imported.
me.config = function(input) {
	// If the `input` parameter is not an `Object`, then halt the `Function`.
	if (!me.isObject(input)) {
		me.log('Config', 'Couldn\'t import config. The `input` must be an Object!', input);
		return false;
	}

	// Drop off any values in the user configuration `Object` which aren't whitelisted.
	input = me.objectConstrain(input, me.config.whitelist, 'fallback.config');

	// Merge in the whitelist with a `null` value for default, if not specified by the user.
	input = me.objectMerge(input, me.config.whitelist);

	// Loop through each of the keys for our `input` and run our normalization/import functions on each of them.
	me.each(input, function(value, key) {
		// Only accept the `value` if it's actually defined, otherwise we'll wind up overriding our existing configuration.
		if (me.isDefined(value)) {
			me[key] = input[key] = me.config[key](value);
		}
	});

	// Return our normalized configuration.
	return input;
};

// Normalize and import the configuration for our `base` parameter. If a `String` is passed in, then the value for the
// `String` will be used for all of the loader types.
me.config.base = function(input) {
	// We expect the `base` parameter to be either a `String` or `Object`.
	if (!me.isString(input) && !me.isObject(input)) {
		me.log('Config', 'The `value` passed in your `config` for `base` was malformed, discarding.', input);
		return null;
	}

	// If we have a `String`, generate an object with out whitelist of keys, and use the `String` as the value.
	if (me.isString(input)) {
		return me.objectMerge(input, me.config.base.whitelist, input);
	}

	// If we received an `Object`, then merge in our defaults with a `null` value if they weren't specified.
	return me.objectMerge(input, me.config.base.whitelist, null);
};

// The whitelist of acceptable keys for `base` parameter if it's an `Object`.
me.config.base.whitelist = ['css', 'img', 'js'];

// Normalize and import the `amd` parameters value. This'll determine whether or not to enforce the use of AMD when
// using this library. By turning this on, when you include library they'll be unavailable in the glboal scope and
// you'll only be able to access them through the library itself, unless they were previously loaded before the library
// or if they don't support AMD. This value is turned off by default.
// @reference http://en.wikipedia.org/wiki/Asynchronous_module_definition
me.config.amd = function(input) {
	return me.normalizeBoolean(input, false);
};

// Normalize and import the `debug` parameters value. This'll determine whether debugging will be turned on/off. By
// default debugging is turned off.
me.config.debug = function(input) {
	return me.normalizeBoolean(input, false);
};

// Normalize and import the `global` parameter value. By default this value will be a reference to the `window` object.
// The library will use this reference when attempting to load a library, to check whether or not the library has
// already been loaded. For example if a website had already loaded `AngularJS` on the page, the library would detect
// by seeing that `window.angular` already exists in the `window`.
me.config.global = function(input) {
	return me.normalizeObject(input, me.global);
};

// Normalize and import the `libs` parameter's series of `Objects`.
me.config.libs = function(input) {
	// If the `libs` parameter is not an `Object`, discard it and throw a warning to the end user.
	if (!me.isObject(input)) {
		me.log('Config', 'The `libs` parameter in your `config` was malformed, discarding.', input);
		return null;
	}

	var normalized = {};

	// Loop through our series of `Objects` for the `libs` parameter.
	me.each(input, function(value, key) {
		// Normalize the value.
		value = me.config.libs.value(value);

		// If our value is not an `Object` then the value is malformed, discard it and throw a warning to the end user.
		if (!me.isObject(value)) {
			me.warning('config', 'libs', 'value', 'The `urls` in your `config` was malformed for `' + key + '`, discarding.', value);
			return;
		}

		// Populate our `normalized` `Object` with a normalized value.
		normalized = me.config.libs.populate(normalized, key, value);

		// Generate a module for this library.
		me.module(key, normalized[key]);
	});

	return normalized;
};

// Normalize the `value` parameter and populate it within the `normalized` `Object`.
me.config.libs.populate = function(normalized, key, value) {
	// Reference our whitelist.
	var whitelist = me.config.libs.whitelist;

	// Constrain the keys of this object to our whitelist.
	value = me.objectConstrain(value, whitelist, 'fallback.config');

	// Merge in our defaults to fill in whatever keys are missing.
	value = me.objectMerge(value, whitelist);

	// Loop through and normalize each of the values for our `Object`.
	me.each(value, function(subValue, subKey) {
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

	// Return our normalized value.
	return value;
};

// Each of these functions expect to have values that are either a `String` or series of strings. If neither is the
// case, then a value of `null` will be returned. If any non-string values are apart of the series, they'll be dropped
// from the series completely.
me.config.libs.alias =
me.config.libs.deps =
me.config.libs.exports =
me.config.libs.urls = function(input) {
	var normalized = me.normalizeStringSeries(input);

	return normalized.length ? normalized : null;
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

// The whitelist of acceptable keys for an `Object` in the `libs` parameter.
me.config.libs.whitelist = ['alias', 'check', 'deps', 'init', 'exports', 'urls'];

// The whitelist of acceptable keys for the `config` functions input `Object`.
me.config.whitelist = ['amd', 'base', 'debug', 'global', 'libs'];

/* global me */

// Defining anonymous and named modules for our library is done through this function. There are a number of ways to
// pass arguments into this function, for more details see comments in the `me.define.args` function.
me.define = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.define.args.apply(null, arguments);

	// If a name and factory weren't passed in, throw a notice to the end user and halt our function.
	if (!args.name && !args.factory) {
		me.warn('define', 'No `name` or `factory` sent to the `define` function! Halting!', args);
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
	if (!args.name && me.define.anonymous.factory) {
		me.warn('define', 'Multiple Anonymous modules defined in the same file! Halting!', args);
		return;
	}

	// If we don't have a name for our module, then we'll define it as an anonymous module. Our callback that loaded our
	// file will see this and set the proper name once the callback executes, which will happen synchronously.
	if (!args.name) {
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

// If a module is sitting in an anonymous state and waiting to be imported properly, this function will take the
// `dependencies` and `factory from that anonymous module, import them in to our properly named module, and then
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
	if (!me.define.anonymous.factory && !me.define.module.last) {
		return;
	}

	// Fetch the instance of our module.
	var module = me.module(moduleName, null, false);

	// If we couldn't find our module, then something went wrong. Let the end user know and halt the `Function`.
	if (!module) {
		me.warn('define', 'anonymous', 'Anonymous module not found for `' + moduleName + '`! Halting definition!');
		return;
	}

	// If our module exists and there's module that's set as our last, then it's not anonymous. Halt the `Function`.
	if (module && me.define.module.last) {
		return;
	}

	// Set the dependencies for our anonymous `module`.
	module.deps = me.define.anonymous.deps;

	// Set the factory for our anonymous `module`.
	module.factory = me.define.anonymous.factory;

	// Reset the pending anonymous values waiting to be populated.
	me.define.anonymous.reset();
};

// The dependencies for our anonymous `module` waiting to be properly defined.
me.define.anonymous.deps = null;

// The factory for our anonymous `module` waiting to be properly defined.
me.define.anonymous.factory = null;

// Clear out any saved anonymous `module` properties.
me.define.anonymous.reset = function() {
	// Clear the dependencies.
	me.define.anonymous.deps = null;

	// Clear the factory.
	me.define.anonymous.factory = null;
};

// Store the anonymous module waiting to be defined.
me.define.anonymous.save = function(args) {
	// Remove the reference for our last defined module.
	me.define.module.last = null;

	// Set the dependencies for our anonymous module.
	me.define.anonymous.deps = args.deps;

	// Set the factory for our anonymous module.
	me.define.anonymous.factory = args.factory;
};

// Handle the arguments for our define function in a special way. In certain cases only 1, 2 or 3 parameters may be
// passed to the `Function`. This `Function` will determine what those parameters should be defined as.
me.define.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.toArray(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
		deps: null,
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

	// If we have more 3 or more arguments, ignore everything after the 3rd argument.
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
	me.log('Loader', '`' + module.name + '` is attempting to load via ' + url);

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
	// Setup our log message that we'll send to the end user.
	var message = '`' + module.name + '` failed to load ';

	// If there's no URL, then all URLs have been exhausted!
	if (!url) {
		me.loader.urls.completed(module);
		return me.log('Loader', message + 'module.');
	}

	// Reset the anonymous module name.
	me.define.anonymous.reset();

	// Let the end user know which specific URL failed to load.
	module.loader.failed.push(url);
	me.log('Loader', message + ' for URL: ' + url);

	// Try the next URL in our URLs list.
	me.loader.urls(module);
};

// When a URL loads sucessfully this function will be called.
me.loader.urls.success = function(module, url, status, factory) {
	// We're going to store the name of the module we're attempting to load here. This way if the file that's loaded
	// happens to call the `define` function with an anonymous name, this is the name that we'll use for the definition.
	me.define.anonymous(module.name, url);

	// If our library was already loaded, we don't know what URL was successful, so we'll skip setting it.
	if (status === 'predefined') {
		me.log('Loader', '`' + module.name + '` already loaded on the page; referencing.');
	} else {
		module.loader.success = url;
		me.log('Loader', '`' + module.name + '` loaded successfully `' + url + '`.');
	}

	// If we have a `init` function, we'll run it now.
	if (me.isFunction(module.init)) {
		module.init();
	}

	// If we don't have a factory for our module, then there was no definition. Regardless of what our value is we'll
	//	reference it here.
	if (!module.factory) {
		module.invoked = true;
		module.factory = factory;
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
	var element = window.document.createElement('img');

	// If we get an `onerror` callback, the image failed to load.
	element.onerror = function() {
		// Remove the element from the page.
		element.remove();

		// Process our failed callback.
		return callbackFailed(module, url, 'failed');
	};

	// If we get an `onload` callback, the image loaded successfully.
	element.onload = function() {
		// Remove the element from the page.
		element.remove();

		// In the case of images, the factory represents the URL.
		return callbackSuccess(module, url, 'success', url);
	};

	// Set the actual URL that we're going to request to load for our image.
	element.src = url;

	// Attempt to load the image on the page.
	return me.head.appendChild(element);
};

/* global me */

// JavaScript loader which is responsible for loading any scripts for the library.
me.loader.js = {};

// Attempt to load a script onto the page.
me.loader.js.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already loaded on the page, don't attempt to reload it.
	var factory = me.loader.js.check(module);
	//console.log(module);
	// @todo we need to check if its already on the page*#@$%()
	//if (factory) {
	//	return callbackSuccess(module, url, 'predefined', factory);
	//}

// @todo make these their own functions and use .apply on them
	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url, 'failed');
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		factory = me.loader.js.check(module);

		if (!factory) {
			return failed();
		}

		return callbackSuccess(module, url, 'success', factory);
	};

	// Create a new script element instance.
	var element = window.document.createElement('script');

	// Set the actual URL that we're going to request to load for our library.
	element.src = url;

	// Set the type, some legacy browsers require this attribute be present.
	element.type = 'text/javascript';

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = check;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events.
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			check();
		}
	};

	// Load our URL on the page.
	return me.head.appendChild(element);
};

// @todo document it
// @todo if there are no exports, simply rely on the callbacks
me.loader.js.check = function(module) {
	if (module.loader.loaded === true) {
		return true;
	}

	if (me.isFunction(module.check)) {
		return module.check();
	}

	if (module.exports.length) {
		return me.loader.js.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return true;
};

// This function will check for the instance of our library based on the exports given. If the instance of our library
// exists it'll be returned, otherwise this function will return `null`.
me.loader.js.check.exports = function(exports) {
	var factory = null;

	// Loop through each of our exports variable, until we find a match.
	me.each(exports, function(variable) {
		// We have to explicity use `eval` because variables will come in many forms. In particular sometimes they will come
		// in the form of being a child of an object. For example `jQuery UI` loads under the window variable `jQuery.ui`. In
		// order for us to get to this programtically we have to use `eval`.

		/*eslint-disable*/
		try {
			if (factory = eval('window.' + variable)) {
				return false;
			}

			// Force our variable back to a `null`.
			factory = null;
		} catch (exception) {
			me.log('loaderJavaScript', '`fallback.loader.js.factory.exports` threw an exception.', exception);
		}
		/*eslint-enable*/
	});

	return factory;
};

/* global me */

// @todo remove the auto adding of exports, if exports aren't present then just rely on the native browser callbacks
// @todo critical for css files^^^^^ debating...

me.loader.css = {};

me.loader.css.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already defined on the page, don't attempt to reload it.
	var factory = me.loader.css.check(module);

	// @todo we need to check if its already on the page*#@$%()
//	if (factory) {
//		return callbackSuccess(module, url, 'predefined', factory);
//	}

	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url, 'failed');
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		factory = me.loader.css.check(module);

		if (!factory) {
			return failed();
		}

		return callbackSuccess(module, url, 'success', factory);
	};

	// Create a new script element instance.
	var element = window.document.createElement('link');

	// Set the actual URL that we're going to request to load for our library.
	element.href = url;

	// Set the type, some legacy browsers require this attribute be present.
	element.rel = 'stylesheet';

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = check;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events.
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			check();
		}
	};

	// Load our URL on the page.
	return me.head.appendChild(element);
};

// @todo document it
me.loader.css.check = function(module) {
	if (module.loader.loaded === true) {
		return true;
	}

	if (module.check) {
		return module.check();
	}

	if (module.exports.length) {
		return me.loader.css.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return true;
};

// This function will check for the instance of our library based on the exports given. If the instance of our library
// exists it'll be returned, otherwise this function will return `null`.
me.loader.css.check.exports = function(exports) {
	var factory = null;

	if (!factory) {
		return true;
	}

	// Loop through each of our exports variable, until we find a match.
	me.each(exports, function(variable) {
		// We have to explicity use `eval` because variables will come in many forms. In particular sometimes they will come
		// in the form of being a child of an object. For example `jQuery UI` loads under the window variable `jQuery.ui`. In
		// order for us to get to this programtically we have to use `eval`.

		/*eslint-disable*/
		try {
			if (factory = eval('window.' + variable)) {
				return false;
			}

			// Force our variable back to a `null`.
			factory = null;
		} catch (exception) {
			me.log('loaderJavaScript', '`fallback.loader.css.factory.exports` threw an exception.', exception);
		}
		/*eslint-enable*/
	});

	return factory;
};

/* global me */

// Fetch an already existant module from our definitions. If the module in question doesn't exist then we'll
// automatically generate it unless we explicity set the `generate` parameter to false.
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

// Store our aliases in a mapped `Object` that way it can be referenced easily to figure out the module.
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
			me.log('Module', 'Module alias `' + alias + '` already exists for `' + me.module.aliases[alias] + '`! Overwriting!');
		}

		// Reference our alias.
		me.module.aliases[alias] = moduleName;

		// If we don't aleady have an alias stored in our modules aliases, then add it.
		if (me.indexOf(module.alias, alias)) {
			module.alias.push(alias);
		}
	});
};

// An `Object` of aliases mappings where the key is the alias and the value is the module that the alias is for.
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

	// If no identity was passed in use our fallback.
	if (!identity) {
		identity = me.module.identify.fallback;
	}

	if (me.isDefined(me.base[identity]) && me.base[identity]) {
		return me.base[identity];
	}

	return null;
};

// Define a new module and normalize the input. This functoin will override a module if it already exists with the same
// name unless the `noOverride` variable is explicity set to `true`.
me.module.define = function(moduleName, input, noOverride) {
	moduleName = me.module.named(moduleName);

	if (me.module.exists(moduleName)) {
		me.log('Module', 'Module `' + moduleName + '` already exists! Overwriting!');

		// If we explicity state not to override an existing module, then halt the function.
		if (noOverride === true) {
			return null;
		}
	}

	// Force our input to an `Object`.
	if (!me.isObject(input)) {
		input = {};
	}

	// The following are our defaults that we'll use to normalize our `input` parameter. The values of this `Object` are
	// `Array` based. The first parameter of the `Array` is the function that we'll use to normalize the value, the 2nd
	// parameter is the fallback value that we'll use. Example: `alias: [me.normalizeStringSeries, []]` will run the
	// `me.normalizeStringSeries` on the value of `alias`, and if the value is malformed, the value will be set to `[]`.
	// If the value in our `defaults` `Object` is not an `Array`, then it will be skipped/ignored from the normalization
	// loop.
	var defaults = {
		// Aliases for the module.
		alias: [me.normalizeStringSeries, null],

		// We store our callbacks here for processing after our library has finished loading.
		callbacks: [me.normalizeFunctionSeries, null],

		// Custom check function to determine whether or not our library has loaded properly.
		check: [me.normalizeFunction, null],

		// Dependencies for the module.
		deps: [me.normalizeStringSeries, null],

		// Exports for the module that we'll check the global scope for to see if the module loaded properly.
		exports: [me.normalizeStringSeries, null],

		// The identity of the module, for example: `css`, `img`, or `js`.
		identitiy: [me.normalizeString, null],

		// If the factory of the module is a function, it'll be invoked upon it's first require then that state will be
		// saved. This flags whether or not the factory was invoked and saved.
		invoked: [me.normalizeBoolean, false],

		// The value of our module. It's value can be anything, example: `Array`, `Function`, `HTMLElement`, `Object`,
		// `String`, etc.
		factory: null,

		// Must be either `null` or a `Function`. As soon as module is first used/referenced, this `Function` will
		// immediately be called upon if present.
		init: [me.normalizeFunction, null],

		// Any loader data for the module will be stored here.
		loader: {
			// Any URLs that failed to load will be stored here.
			failed: [me.normalizeStringSeries, null],

			// Whether or not we actually attempted to load this module.
			loaded: [me.normalizeBoolean, false],

			// If a URL loaded sucecssfully, it will be stored here.
			success: [me.normalizeString, null],

			// The time that a module finished loading.
			timeEnd: [me.normalizeNumber, null],

			// The time that a module initiated it's load sequence. This includes all loading for the module in question. For
			// example if a library had 3 fallback URLs, and the first 2 failed due to timeouts, and the 3rd was successful,
			// this variable would reflect the current time prior to the first 2 URLs failing.
			timeStart: [me.normalizeNumber, null],

			// Flags whether or not the module is currently in the process of loading.
			working: [me.normalizeBoolean, false]
		},

		// Where all the URLs are stored for our module.
		urls: [me.normalizeStringSeries, null]
	};

	var normalized = {};

	me.each(['', 'loader'], function(inputKey) {
		var payload = defaults;

		if (inputKey) {
			normalized[inputKey] = {};
			payload = payload[inputKey];
		}

		me.each(payload, function(values, key) {
			// By default set the value to whatever was passed in to our function.
			var value = input[key];

			// If our `values` is an `Array`, the run our normalization function on the input value.
			if (me.isArray(values)) {
				value = values[0](value, values[1]);
			}

			if (inputKey) {
				normalized[inputKey][key] = value;
				return;
			}

			normalized[key] = value;
		});
	});

	// @todo move all this shit out
	normalized.name = moduleName;

	normalized.identity = me.module.identify(moduleName);

	normalized.urls = me.module.urls(normalized.identity, normalized.urls);

	var module = me.module.definitions[moduleName] = normalized;

	// Import our module aliases.
	me.module.alias(moduleName, normalized.alias);

	return module;
};

// All our module definitions will be stored and refeerence through this `Object`. The keys of this object correlate to
// the modules name.
me.module.definitions = {};

// Process all of our callbacks for a specific module.
me.module.callbacks = function(moduleName) {
	var module = me.module(moduleName, null, false);

	// If are callbacks are empty, then end of the function.
	if (!module.callbacks.length) {
		return;
	}

	me.each(module.callbacks, function(callback, index) {
		callback();
		delete module.callbacks[index];
	});
};

// Check whether or not a module already exists.
me.module.exists = function(moduleName) {
	if (me.isDefined(me.module.definitions[me.module.named(moduleName)])) {
		return true;
	}

	return false;
};

// Identify the type of module that we have.
me.module.identify = function(moduleName) {
	var fallback = me.module.identify.fallback;

	if (!moduleName) {
		return fallback;
	}

	var split = moduleName.split(me.module.identify.delimiter);

	if (split.length < 2 || me.module.identify.types.indexOf(split[0]) === -1) {
		return fallback;
	}

	return split[0];
};

// The identifier to fallback on if we cannot find a match.
me.module.identify.fallback = 'js';

// The character to split our module names on to derive it's identity.
me.module.identify.delimiter = '$';

// The support identifier types.
me.module.identify.types = ['css', 'img', 'js'];

// Fetch the name of a module, if a module alias is passed in, this will go and fetch the modules real name.
me.module.named = function(moduleName) {
	// Fetch our real module name, in the case that we're passed an alias.
	if (me.isDefined(me.module.aliases[moduleName])) {
		moduleName = me.module.aliases[moduleName];
	}

	return moduleName;
};

// Normalize all of the URLs for our modules. This function will automatically prepend our base URLs and store them.
// This has a few benefits: we don't have to worry about processing the URLs later. We're able to store a snapshot
// of the current base URLs for the module in question, this way we can change our base URLs later and still maintain
// and use a different set of base URLs with other modules.
me.module.urls = function(identity, urls) {
	var base = me.module.base(identity);
	var extension = '.' + identity;
	var normalizedUrls = [];

	me.each(urls, function(url) {
		if (identity !== 'img' && url.substr(-extension.length) !== extension) {
			url += extension;
		}

		if (base) {
			var isIgnored = false;

			me.each(me.module.urls.ignore, function(ignorer) {
				if (url.substr(0, ignorer.length) === ignorer) {
					isIgnored = true;
					return false;
				}
			});

			if (!isIgnored) {
				url = base + url;
			}
		}

		normalizedUrls.push(url);
	});

	return normalizedUrls;
};

// URL prefixes to specifically ignore from prepending with our base URL.
me.module.urls.ignore = ['/', 'data:', 'http://', 'https://'];

/* global me */

// Load up and invoke our modules along with all of their dependencies. This function will first find all dependencies
// for our modules and them in reverse order. After loading them it'll then invoke them in reverse order. This needs to
// happen in 2 separate operation due to the possibility of anonymous modules having their own dependencies that we
// won't know about until it's actually been loaded.
me.require = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.require.args.apply(null, arguments);

	// Boot up our dependencies.
	me.require.boot(args.deps, function() {
		// At this point all of our dependencies have loaded, now we need to go ahead and invoke all of our dependencies in a
		// reverse order, that way our initial modules that invoked the `require` can be executed.
		me.require.invoke(args.deps);

		// Only attempt to invoke the `factory` if it's a `Function`.
		if (me.isFunction(args.factory)) {
			args.factory.apply(null, me.require.invoke.references(args.deps));
			//me.require.apply(args.deps, args.factory); @todo
		}
	});
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
	var args = Array.prototype.slice.call(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
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












// @todo at this point we know all deps have loaded, we just need to invoke them now! :D
me.require.invoke = function(deps) {
	var dependencies = me.require.dependencies(deps, true);
	dependencies.reverse();
	dependencies = dependencies.concat(deps);

	me.each(dependencies, function(dependency) {
		me.require.invoke.module(dependency);
	});
};

me.require.invoke.module = function(moduleName) {
	var module = me.module(moduleName, null, false);

	if (!module) {
		// @todo throw an exception to user
		return null;
	}

	if (!module.invoked) {
		module.invoked = true;

		if (me.isFunction(module.factory)) {
			module.factory = module.factory.apply(null, me.require.invoke.references(module.deps));
		}
	}

	return module.factory;
};

me.require.invoke.references = function(deps) {
	var references = [];

	if (!deps.length) {
		return references;
	}

	me.each(deps, function(dependency) {
		references.push(me.require.invoke.module(dependency));
	});

	return references;
};




// Load up all of our dependencies, along with any nested dependencies in reverse order.
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

	me.require.boot.dependencies(modules, callback);
};

me.require.boot.dependencies = function(modules, callback) {
	var dependencies = me.require.dependencies(modules);

	// Loop around until we find the start of our dependency tree.
	if (dependencies.length) {
		return me.require.boot(dependencies, function() {
			me.require.module(modules, function() {
				var newDeps = me.require.dependencies(modules);

				if (newDeps.join() !== dependencies.join()) {
					return me.require.boot(newDeps, function() {
						me.require.module(modules, callback);
					});
				}
				//
				callback();
			});
		});
	}

	// Load the start of our dependency tree.
	me.require.module(modules, callback);
};


me.require.boot.anonymous = function(modules, callback) {
	// Store our anonymous modules that we need to load.
	var queue = me.require.anonymous(modules);

	// If we have anonymous modules that we need to load, do it now, then loop back around.
	if (queue.length) {
		me.require.boot.loop(queue, modules, callback);

		return true;
	}

	return false;
};


// Load up a queue of modules, then invoke the `me.require.deps` function again with the same parameters.
me.require.boot.loop = function(queue, modules, callback) {
	me.require.module(queue, function() {
		me.require.boot(modules, callback);
	});
};

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
		queue.push(function(callback) {
			// Load the module onto the page.
			me.loader.boot(moduleName, callback);
		});
	});

	// Invoke the queue.
	me.parallel(queue, callback);
};



me.require.anonymous = function(modules) {
	// Store our queue of anonymous modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If our module doesn't exist, then it's a anonymous module that we need to load up first to find out what
		// dependencies are actually required for it.
		if (!module) {
			// Setup the configuration for our anonymous module.
			me.require.config(moduleName);

			// Push the module off to our queue.
			queue.push(moduleName);

			// Don't pass this point, as we can't figure out the dependencies for our module yet.
			return;
		}

		// Add any dependencies that are anonymous modules to our queue as well.
		queue = queue.concat(me.require.anonymous(module.deps));
	});

	// Return all of our queued anonymous modules.
	return queue;
};

me.require.dependencies = function(modules, loop) {
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
		if (loop === true) {
			queue = queue.concat(me.require.dependencies(module.deps, loop));
		}
	});

	// Return all of our queued dependency modules.
	return queue;
};

me.version = '2.0.0';

me.init();

})(window);
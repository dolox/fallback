// The container variable for our library instance. As you browse through the libraries code you'll see the `me`
// variable referenced throughout, this is simply short-hand for the library.
var me = {};

// Initialize our library. This function must be invoked before we start using the library.
me.init = function() {
	// Reference the `head` element of our document and store it into memory. The if statement is for test coverage.
	me.head = global.document ? global.document.getElementsByTagName('head')[0] : null;

	// Reference aliases for the library into the `global` object for the user to directly access.
	me.init.aliases(global, me.aliases);

	// Initialize our loader object.
	me.loader.init();
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
				me.log(2, 'core', 'init', 'aliases', 'The variable container["' + alias + '"] already exists. Overriding!');
			}

			// Map the alias to our module.
			me.module.alias(moduleName, alias);

			// Reference the alias of the module within the `container` reference.
			container[alias] = factory;
		});
	});

	// Reset any pending anonymous state.
	me.define.anonymous.reset();
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
	if (!me.isaArray(input) && !me.isObject(input) && typeof input !== 'object') {
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
	if (!me.isaArray(normalized)) {
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

// The character to split our module names on to derive it's identity.
me.delimiter = '$';

// Shorthand for a `for in` loop. Less code, easier readability. If `false` is returned, the loop will be halted.
me.each = function(input, callback) {
	// If anything other than an `Array` or `Object` was passed in, halt the `Function`.
	if (!me.isaArray(input) && !me.isObject(input) && typeof input !== 'object') {
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

// The ability to fetch the decendant property of an object, even if it's in dot notation.
me.getProperty = function(reference, property) {
	var properties = property.split('.');

	while (properties.length) {
		reference = reference[properties.shift()];
	}

	return reference;
};

// Whether or not to use a reference to `window` to check if a library has already been loaded. This is also used when
// loading libraries to determine if they loaded properly for legacy browsers.
me.globals = true;

// Legacy browsers don't support `Array.prototype.indexOf`, this function dubs as a polyfill for this browsers. In
// particular IE < 9, doesn't support it. @ie @ie6 @ie7 @ie8
// @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
me.indexOf = function(input, value) {
	// By default we'll return `-1` if nothing is found to simulate the native `indexOf` functionality.
	var index = -1;

	// If our `input` is not an `Array`, or our `value is not a `String` or `Number`, halt the `Function`.
	if (!me.isaArray(input) || !me.isString(value) && !me.isNumber(value)) {
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

// Constrain an object to only contain a specific set of keys. All other keys are discarded, and a warning is thrown.
me.objectConstrain = function(input, whitelist, reference) {
	// Store our normalized `Object`.
	var normalized = {};

	// If our `input` is not an `Object` return an empty `Object`.
	if (!me.isObject(input)) {
		return normalized;
	}

	// If we don't have a `whitelist` or if it's not an `Array`, return our `input`.
	if (!me.isaArray(whitelist)) {
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
	var defaultsIsArray = me.isaArray(defaults);

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

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

// Check whether or not a variable is defined.
me.isDefined = function(variable) {
	return variable !== void 0;
};

// Check a `String` to see if it contains a prefix.
me.isPrefixed = function(reference, prefixes) {
	// Flag whether or not a URL should be ignore from being prepended with the base URL.
	var isPrefixed = false;

	// Loop through our ignore list.
	me.each(prefixes, function(prefix) {
		// Check to see if the prefix of our URL has a match in our ignore list.
		if (reference.substr(0, prefix.length) === prefix) {
			// Flag the URL as ignored.
			isPrefixed = true;

			// Halt the loop.
			return false;
		}
	});

	// Return whether or not we found a match.
	return isPrefixed;
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
		return me.normalize.series(input, type, me.isDefined(fallback) ? fallback : [], strip);
	};
};

// The different utility types that we want to generate functions for.
me.utility.types = ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'];

// Spawn our utility functions for the library.
me.init.utilities(me, me.utility.types);

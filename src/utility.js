// Automatically generate utility functions for our library. This library will generate the following functions:
// - isArray, normalizeArray, normalizeArraySeries
// - isBoolean, normalizeBoolean, normalizeBooleanSeries
// - isFunction, normalizeFunction, normalizeFunctionSeries
// - isNumber, normalizeNumber, normalizeNumberSeries
// - isObject, normalizeObject, normalizeObjectSeries
// - isString, normalizeString, normalizeStringSeries
var utility = function(container, type) {
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

// Automatically spawn helper functions that we'll use throughout the library. For example we're spawning the following
// functions: `isArray`, `normalizeArray`, `normalizeArraySeries`, etc. Spawning these functions this way results in
// less code for the library and achieves the same objective.
utility.init = function(container, input) {
	// Loop through each of our different utility types.
	for (var index in input) {
		// Make sure it's not empty.
		if (input[index]) {
			// Spawn the utility function for the library.
			utility(container, input[index]);
		}
	}

	// We have to reference `isaArray` since `isArray` is a reserved keyword and won't be compressed.
	// @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	me.isaArray = me.isArray;
};

// The different utility types that we want to generate functions for.
utility.types = ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'];

// Spawn our utility functions for the library.
utility.init(me, utility.types);

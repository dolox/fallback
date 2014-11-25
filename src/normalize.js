// Generate a normalization function based on the type that is passed in. For example if a type of `String` was passed
// in, the function `normalizeString` would be generated for the library. The purpose of these functions are to
// normalize any data that's passed into them. If you try to pass an `Array` to `normalizeString`, the function would
// then return the `fallback` value that is specified; if no `fallback` value is specified it would then return `null`.
var normalize = function(input, type, fallback) {
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
normalize.series = function(input, type, fallback, strip) {
	// Store our normalized series.
	var normalized = [];

	// Case our input to an array/series.
	if (!me.isaArray(input)) {
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

// Reference the module within the library.
me.normalize = normalize;

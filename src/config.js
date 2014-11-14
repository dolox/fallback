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

// Each of these functions expect to have values that's a `Boolean`. If this isn't the case, then a value of `false`
// will be set as the value.
me.config.amd =
me.config.debug =
me.config.globals = function(input) {
	return me.normalizeBoolean(input, false);
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
		return input;
	}

	// If we received an `Object`, then merge in our defaults with a `null` value if they weren't specified.
	return me.objectMerge(input, me.config.base.whitelist, null);
};

// The whitelist of acceptable keys for `base` parameter if it's an `Object`.
me.config.base.whitelist = ['css', 'img', 'js'];

// The character to split our module names on to derive it's identity. The value must always be a `String`.
me.config.delimiter = function(input) {
	return me.normalizeString(input, '$');
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
			me.log(2, 'config', 'libs', 'value', 'The `urls` in your `config` was malformed for `' + key + '`, discarding.', value);
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
me.config.whitelist = ['amd', 'base', 'debug', 'delimiter', 'globals', 'libs'];

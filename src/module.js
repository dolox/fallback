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
		'alias': [me.normalizeStringSeries, null],

		// We store our callbacks here for processing after our library has finished loading.
		'callbacks': [me.normalizeFunctionSeries, null],

		// Custom check function to determine whether or not our library has loaded properly.
		'check': [me.normalizeFunction, null],

		// Dependencies for the module.
		'deps': [me.normalizeStringSeries, null],

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
		'urls': [me.normalizeStringSeries, null]
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

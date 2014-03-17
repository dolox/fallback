/*global global, window*/

// Define our library.
var me = {
	base: null,
	globals: true,
	namespace: null,
	override: false,

	callbacks: {
		bootstrap: [],
		config: []
	},

	exports: {},
	initializers: {},
	paralells: {},

	internals: {},
	internalsCount: 0,

	modules: {},
	modulesCount: 0
};

// Get arguments from a referenced function.
me.args = function(reference) {
	if (!me.isFunction(reference)) {
		return [];
	}

	var expessions = {
		arg: /^\s*(_?)(.+?)\1\s*$/,
		args: /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		args_split: /,/,
		comments: /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
	};

	var inject;

	if (!(inject = reference.inject)) {
		inject = [];
		var name = reference.toString().replace(expessions.comments, '');
		var declaration = name.match(expessions.args);

		me.each(declaration[1].split(expessions.args_split), function(arg) {
			arg.replace(expessions.arg, function(all, underscore, name) {
				inject.push(name);
			});
		});

		reference.inject = inject;
	}

	return inject;
};

// Clone an array.
me.arrayClone = function(input) {
	if (!me.isArray(input)) {
		return [];
	}

	return input.slice(0);
};

// Array/object keys.
me.arrayKeys = function(input) {
	if (!me.isArray && !me.isObject(input)) {
		return [];
	}

	var keys = [];
	var isObject = me.isObject(input);

	me.each(input, function(key, index) {
		if (isObject) {
			keys.push(index);
		} else {
			keys.push(key);
		}
	});

	return keys;
};

// Last element of array.
me.arrayLast = function(input) {
	if (!me.isArray(input)) {
		return;
	}

	return input[input.length - 1];
};

// Make all items in an array unique.
me.arrayUnique = function(input) {
	var normalized = [];

	if (me.isArray(input)) {
		me.each(input, function(value) {
			if (me.indexOf(normalized, value) === -1) {
				normalized.push(value);
			}
		});
	}

	return normalized;
};

// Autoload script based on data attribute.
me.autoloader = function(attributes) {
	var values = [];

	if (me.isString(attributes)) {
		attributes = [attributes];
	}

	if (me.isArray(attributes)) {
		var scripts = global.document.getElementsByTagName('script');

		if (typeof scripts === 'object') {
			me.each(scripts, function(script) {
				if (!me.isHTMLScriptElement(script)) {
					return;
				}

				me.each(attributes, function(attribute) {
					var value = script.getAttribute('data-' + attribute);

					if (value) {
						value = value.split(',');
						values = values.concat(value);
					}
				});
			});
		}
	}

	return values;
};

// Bootstrap our library.
me.bootstrap = function() {
	me.utility.bootstrap();
	me.bootstrap.internals();

	// Load our base URI from the script tag if available.
	var base = me.autoloader(['base']);

	if (base.length) {
		me.base = me.arrayLast(base);
	}

	// Autoload files if data attribute present in script tag.
	var bootstrap = me.autoloader(['bootstrap']);

	if (bootstrap.length) {
		me.internal('loader').load(bootstrap);
	}
};

// Bootstrap for our internal modules.
me.bootstrap.internals = function() {
	me.internal.callback('bootstrap');
};

// Check if our variable is a function, if not make it one.
me.callback = function(variable) {
	var me = this;

	if (!me.isFunction(variable)) {
		variable = function() {};
	}

	return variable;
};

// Configure and cleanse user input.
me.config = function(input) {
	var normalized = me.config.input(input);

	me.base = normalized.base;
	me.debug = normalized.debug;
	me.globals = normalized.globals;

	me.config.paths(normalized.paths);
	me.config.dependencies(normalized.dependencies);
	me.config.exports(normalized.exports);
	me.config.initializers(normalized.initializers);

	me.internal.callback('config', input);
};

// Normalize the exports.
me.config.exports = function(input) {
	var cleansed = {};

	if (me.isObject(input)) {
		me.each(input, function(module, exports) {
			var module_reference = me.module(exports, false);

			if (!module_reference) {
				return;
			}

			if (!module || !me.isString(module)) {
				module = exports;
			}

			cleansed[exports] = me.exports[exports] = module_reference.exports = module;
		});
	}

	return cleansed;
};

// Normalize dependencies.
me.config.dependencies = function(modules) {
	var cleansed = {};

	if (me.isObject(modules)) {
		me.each(modules, function(dependencies, module) {
			// If the module doesn't exist, skip, it's invalid.
			// If the dependencies are undefined, null or an empty string, skip, it's invalid.
			if (!me.module(module, false) || !dependencies) {
				return;
			}

			// If the dependencies are a string, convert to array.
			if (me.isString(dependencies)) {
				dependencies = [dependencies];
			}

			// If the dependencies are not an array, skip, it's invalid.
			if (!me.isArray(dependencies)) {
				return;
			}

			// Check to make sure the libraries exist otherwise remove them.
			var cleansedDependencies = [];

			me.each(dependencies, function(dependency) {
				// Make sure the module actually exists and that the dependency doesn't include itself.
				if (me.module(dependency, false) && dependency !== module) {
					cleansedDependencies.push(dependency);
				}
			});

			// Generate module, if it doesn't exist.
			me.module(module);

			// Merge the new dependencies.
			me.modules[module].dependencies = cleansed[module] = me.arrayUnique(me.modules[module].dependencies.concat(cleansedDependencies));
		});
	}

	return cleansed;
};

// Normalize the initializers.
me.config.initializers = function(input) {
	var cleansed = {};

	if (me.isObject) {
		me.each(input, function(reference, module) {
			if (!me.module(module, false) || !me.isFunction(reference)) {
				return;
			}

			cleansed[module] = me.initializers[module] = reference;
		});
	}

	return cleansed;
};

// Normalize user input.
me.config.input = function(input) {
	var defaults = {
		base: null,
		debug: false,
		dependencies: {},
		deps: {},
		exports: {},
		globals: true,
		init: {},
		initializers: {},
		paths: {}
	};

	if (!me.isObject(input)) {
		return defaults;
	}

	input = me.merge(defaults, input, true);

	if (!me.isBoolean(input.debug)) {
		input.debug = false;
	}

	if (!me.isString(input.base)) {
		input.base = null;
	}

	if (!me.isObject(input.modules)) {
		input.modules = {};
	}

	if (!me.isObject(input.dependencies)) {
		input.dependencies = {};
	}

	if (!me.isObject(input.deps)) {
		input.deps = {};
	}

	if (me.isEmpty(input.dependencies)) {
		input.dependencies = input.deps;
	}

	if (!me.isObject(input.exports)) {
		input.exports = {};
	}

	if (input.globals !== false) {
		input.globals = true;
	}

	if (!me.isObject(input.initializers)) {
		input.initializers = {};
	}

	if (!me.isObject(input.init)) {
		input.init = {};
	}

	if (me.isEmpty(input.initializers)) {
		input.initializers = input.init;
	}

	delete input.deps;
	delete input.init;

	return input;
};

// Normalize paths.
me.config.paths = function(paths) {
	var cleansed = {};

	if (me.isObject(paths)) {
		me.each(paths, function(urls, module) {
			// If `urls` is undefined, null or an empty string, skip, it's invalid.
			if (me.isEmpty(urls)) {
				return;
			}

			// If `urls` is a string, convert it to any array.
			if (me.isString(urls)) {
				urls = [urls];
			}

			// If `urls` is not an array, skip, it's invalid.
			if (!me.isArray(urls)) {
				return;
			}

			// Generate module, if it doesn't exist.
			me.module(module);

			// Fix the urls that are relative.
			urls = me.config.paths.url(urls);

			// Concat current urls.
			urls = me.modules[module].paths.concat(urls);

			// Remove duplicates.
			urls = me.arrayUnique(urls);

			// Merge the new URLs.
			cleansed[module] = me.modules[module].paths = urls;
		});
	}

	return cleansed;
};

// For any relative paths apply the base variable prefix and append the extension properly.
me.config.paths.url = function(urls) {
	me.each(urls, function(url, index) {
		urls[index] = me.uri(url);
	});

	return urls;
};

// Foreach function.
me.each = function(object, callback) {
	if (!me.isArray(object) && !me.isObject(object) && typeof object !== 'object') {
		return;
	}

	callback = me.callback(callback);

	for (var index in object) {
		if (callback(object[index], index) === -1) {
			break;
		}
	}
};

// Generate global unique idenifier.
me.guid = function() {
	function block(dashed) {
		var generated = (Math.random().toString(16) + '000000000').substr(2, 8);
		return dashed ? '-' + generated.substr(0,4) + '-' + generated.substr(4,4) : generated;
	}

	return block() + block(true) + block(true) + block();
};

// Logging function.
me.log = function() {
	if (!me.debug || typeof window.console === undefined || !window.console) {
		return false;
	}

	if (arguments.length > 1) {
		var args = [];

		me.each(arguments, function(arg) {
			// Skip functions.
			if (typeof arg === 'function') {
				return;
			}

			args.push(arg);
		});

		var first = '%c' + args.shift();
		return window.console.log(first, 'font-weight: bold; color: #ff0000', args.join(' '));
	}

	return window.console.log(arguments);
};

// indexOf isn't supported on arrays in legacy browsers.
me.indexOf = function(object, value) {
	var result = -1;

	if (me.isArray(object) && (me.isString(value) || me.isNumber(value))) {
		me.each(object, function(iteration, index) {
			if (iteration === value) {
				result = parseInt(index, 10);
				return -1;
			}
		});
	}

	return result;
};

// Initialize an internal module.
me.internal = function(id, reference) {
	// If the internal is already defined, do not re-define it.
	if (me.isDefined(me.internals[id])) {
		return me.internals[id];
	}

	// Maintain a running count of our internals.
	me.internalsCount++;

	// Import the internal module.
	return me.internals[id] = reference;
};

// Invoke internal callbacks.
me.internal.callback = function(name, input, callback) {
	callback = me.callback(callback);

	if (me.isDefined(me.callbacks[name]) && me.isArray(me.callbacks[name])) {
		var parallel = [];

		me.each(me.callbacks[name], function(reference) {
			parallel.push(function(callback) {
				reference(input, callback);
			});
		});

		me.parallel(parallel, callback);
		return;
	}

	callback(true);
};

// Check if our variable is defined.
me.isDefined = function(variable) {
	var defined = false;

	try {
		defined = typeof variable !== 'undefined';
	} catch (exception) {}

	return defined;
};

// Check if object/array is empty.
me.isEmpty = function(variable) {
	if (!me.isDefined(variable)) {
		return true;
	}

	if (variable === null) {
		return true;
	}

	if (me.isString(variable) && variable !== '') {
		return false;
	}

	if (me.isNumber(variable) && variable !== 0) {
		return false;
	}

	if (me.isArray(variable)) {
		return variable.length === 0;
	}

	if (me.isFunction(variable)) {
		return false;
	}

	if (!me.isObject(variable)) {
		return true;
	}

	// If we made it this far, it's an object, iterate first item.
	var empty = true;

	me.each(variable, function() {
		empty = false;
		return -1;
	});

	return empty;
};

// Merge objects.
me.merge = function(source, target, constrain) {
	if (!me.isObject(source) || !me.isObject(target)) {
		return {};
	}

	var output = source;

	me.each(target, function(targetValue, index) {
		var accept = false;

		if (constrain && me.isDefined(source[index])) {
			accept = true;
		} else if (!constrain) {
			accept = true;
		}

		output[index] = targetValue;
	});

	return output;
};

// Initialize a module.
me.module = function(id, generate) {
	if (!id) {
		return false;
	}

	// If the module is already defined, do not re-define it.
	if (me.isDefined(me.modules[id])) {
		return me.modules[id];
	}

	if (me.isDefined(me.modules[me.exports[id]])) {
		return me.modules[me.exports[id]];
	}

	if (generate === false) {
		return false;
	}

	// Maintain a running count of our modules.
	me.modulesCount++;

	// Import the module.
	me.modules[id] = {
		id: id, // Identifier.
		dependencies: [], // Module dependencies.
		exports: null, // Exports for the module into global scope.
		factory: null, // Function for the module.
		failed: [], // URIs that failed to load.
		init: undefined, // Initialization function after resource is loaded.
		loaded: false, // Flags whether the modules paths were loaded.
		paths: [], // Paths of URIs for the module.
		processed: null, // Result of processed factory function.
		ready: false, // The current state of the module.
		success: [], // URIs that loaded successfully.

		local: {
			require: me.internal('amd').require,
			exports: null // Exports for the module locally.
		}
	};

	// Import the exports.
	var exports = {};
	exports[id] = null;
	me.config.exports(exports);

	return me.modules[id];
};

// Call upon initializer function for module if it exists.
me.module.initializer = function(modules) {
	if (!me.isArray(modules)) {
		modules = [modules];
	}

	me.each(modules, function(module) {
		var module_callback = me.initializers[module];

		// Attempt to use the export if the module name doesn't work.
		if (!me.isDefined(module_callback)) {
			module_callback = me.initializers[me.exports[module]];
		}

		// Fire the module_callback if it's available.
		if (me.isFunction(module_callback)) {
			me.internal('amd').require(module_callback);
		}
	});
};

// Run functions in parallel with a single callback.
me.parallel = function(references, callback) {
	callback = me.callback(callback);

	if (!me.isArray(references)) {
		callback();
		return;
	}

	var guid = me.guid();

	me.paralells[guid] = {
		interval: 0,
		length: references.length
	};

	me.each(references, function(reference) {
		me.parallel.anonymous(reference, guid, callback);
	});
};

// Anonymous function for parallel to run.
me.parallel.anonymous = function(reference, guid, callback) {
	reference(function() {
		var parallel = me.paralells[guid];
		parallel.interval++;

		if (parallel.interval === parallel.length) {
			delete me.paralells[guid];
			callback(true);
		}
	});
};

// Generate URI from base and URI.
me.uri = function(uri) {
	if (me.isEmpty(uri)) {
		return uri;
	}

	// If no extension then default to javascript.
	var extension = me.arrayLast(uri.split('.'));

	if (extension !== 'js' && extension !== 'css') {
		uri += '.js';
	}

	if (uri.substr(0, 2) === '//' || uri.indexOf('://') !== -1) {
		return uri;
	}

	return (me.base ? me.base : '') + uri;
};

// Setup individual utility function.
me.utility = function(type) {
	return me['is' + type] = function(variable) {
		return Object.prototype.toString.call(variable) == '[object ' + type + ']';
	};
};

// Utility functions to check against variables.
me.utility.types = ['Array', 'Boolean', 'Function', 'HTMLScriptElement', 'Number', 'Object', 'String'];

// Bootstrap the utility functions.
me.utility.bootstrap = function() {
	for (var index in me.utility.types) {
		var type = me.utility.types[index];
		me.utility(type);
	}
};
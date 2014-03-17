/*jslint browser: true*/

(function (global) {
'use strict';

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

			// Merge the new URLs.
			cleansed[module] = me.modules[module].paths = me.arrayUnique(me.modules[module].paths.concat(urls));
		});
	}

	return cleansed;
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
	if (typeof console === undefined || !console) {
		return false;
	}
	return;
	if (arguments.length > 1) {
		var args = [];

		for (var index in arguments) {
			var arg = arguments[index];

			// Skip functions.
			if (typeof arg === 'function') {
				continue;
			}

			args.push(arg);
		};

		var first = '%c' + args.shift();
		return console.log(first, 'font-weight: bold; color: #ff0000', args.join(' '));
	}

	return console.log(arguments);
};

// indexOf isn't supported on arrays in legacy browsers.
me.indexOf = function(object, value) {
	if (me.isArray(object) && (me.isString(value) || me.isNumber(value))) {
		for (var index in object) {
			if (object[index] === value) {
				return parseInt(index, 10);
			}
		}
	}

	return -1;
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

	for (var index in target) {
		var accept = false;

		if (constrain && me.isDefined(source[index])) {
			accept = true;
		} else if (!constrain) {
			accept = true;
		}

		output[index] = target[index];
	}

	return output;
};

// Initialize a module.
me.module = function(id, generate) {
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
		defined: false, // Determines whether the module has a definition. @todo
		dependencies: [], // Module dependencies.
		exports: null, // Exports for the module into global scope.
		factory: null, // Function for the module.
		failed: [], // URIs that failed to load.
		init: undefined, // Initialization function after resource is loaded.
		loaded: false, // Flags whether the modules paths were loaded. @todo
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
me.utility.types = ['Array', 'Function', 'HTMLScriptElement', 'Number', 'Object', 'String'];

// Bootstrap the utility functions.
me.utility.bootstrap = function() {
	for (var index in me.utility.types) {
		var type = me.utility.types[index];
		me.utility(type);
	}
};
// Define our module.
var amd = {
	global: true,
	queue: []
};

// Module initializer.
amd.initialize = function() {
	me.log('amd', 'initialize');

	// Bootstrap the AMD module.
	amd.bootstrap();

	// Import the module.
	me.internal('amd', amd);
};

// Bootstrap our library.
amd.bootstrap = function() {
	me.log('amd', 'bootstrap');

	// If functions define and require are not defined within the global scope, define them.
	if (!me.isDefined(global.define) && !me.isDefined(global.require)) {
		global.define = amd.define;
		global.require = amd.require;
	}
};

// Define a new module.
amd.define = function(id, dependencies, factory) {
	me.log('amd', 'define', id, dependencies, factory);

	// If the id is not a string, then an id was not included.
	if (!me.isString(id)) {
		factory = dependencies;
		dependencies = id;
		id = null;
	}

	// If the dependcies is not an array, then it was not included.
	if (!me.isArray(dependencies)) {
		factory = dependencies;
		dependencies = [];
	}

	// If the factory isn't an object or function, the arguments are malformed.
	if (!me.isObject(factory) && !me.isFunction(factory)) {
		return;
	}

	// Merge dependencies from factory.
	if (me.isFunction(factory)) {
		dependencies = dependencies.concat(me.args(factory));
		dependencies = me.arrayUnique(dependencies);
	}

	// Push definitions to the queue.
	amd.queue.push({
		id: id,
		dependencies: dependencies,
		factory: factory
	});
};

// Define our module.
amd.defineModule = function(id, dependencies, factory) {
	me.log('amd', 'defineModule', id, dependencies, factory);

	var module = me.module(id, false);

	// If the module already exists check if we want to override.
	if (module) {
		if (module.factory !== null && me.override === false) {
			// Do not override our module!
			return;
		}
	} else {
		// Generate the module.
		module = me.module(id);
	}

	// Push over the dependencies.
	module.dependencies = dependencies;

	// Push over the factory.
	module.factory = factory;

	// Set the exports.
	module.local.exports = {};
};

// Process the queue.
amd.process = function(id) {
	me.log('amd', 'process', id);

	me.each(amd.queue, function() {
		var module = amd.queue.shift();

		if (module.id === null) {
			module.id = id;
		}

		amd.defineModule(module.id, module.dependencies, module.factory);
	});
};

// Require modules and dependencies.
amd.require = function(modules, factory) {
	me.log('amd', 'require', modules, factory);

	// Process our global page definitions.
	if (amd.global) {
		amd.global = false;
		amd.process('global');
	}

	// If modules are not passed in, we'll retrieve them from the factory.
	if (me.isFunction(modules)) {
		factory = modules;
		modules = [];
	}

	// If the modules argument is neither a string or array, the arguments are malformed.
	if (!me.isString(modules) && !me.isArray(modules)) {
		return;
	}

	// If the modules argument is a string, normalize it to an array.
	if (me.isString(modules)) {
		modules = [modules];
	}

	// Merge dependencies from factory.
	if (me.isFunction(factory)) {
		modules = modules.concat(me.args(factory));
		modules = me.arrayUnique(modules);
	}

	loader.ready(modules, function() {
		amd.require.invoke(factory);
	});

	return;
};

// Invoke a require's factory when in a ready state.
amd.require.invoke = function(factory, id) {
	me.log('amd', 'invoke', factory, id);

	if (!factory) {
		return;
	}

	var args = [];
	var dependencies = me.args(factory);
	var paths = {};

	// Load all modules of dependencies, then invoke factory when ready.
	me.each(dependencies, function(dependency) {
		var dependency_exists = me.module(dependency, false);
		var dependency_reference;

		var module_exists = id ? me.module(id, false) : false;
		var reference;

		// If the module is one of these defaults, treat them specially.
		if (module_exists) {
			var module_reference = me.module(id);

			if (dependency === 'exports' || dependency === 'require') {
				reference = module_reference.local[dependency];
			} else if (dependency === 'module') {
				reference = module_reference;
			}
		}

		// If our reference still isn't set, get the processed function, if non-existant, use the exports.
		if (reference === undefined && dependency_exists) {
			dependency_reference = me.module(dependency);

			if (dependency_reference.processed) {
				reference = dependency_reference.processed;
			} else if (dependency_reference.local.exports) {
				reference = dependency_reference.local.exports;
			}
		}

		// Special case to set exports to global.
		if (reference === undefined && dependency === 'exports') {
			reference = global;
		}

		// If our reference still isn't set, try to grab from globals.
		if (me.globals === true && module_exists === false && reference === undefined) {
			if (dependency_exists && dependency_reference) {
				var global_reference = me.internal('js').reference(dependency_reference.exports);
				reference = global_reference;
			} else if (me.isDefined(global[dependency])) {
				reference = global[dependency];
			}
		}

		// Attempt to autoload the library.
		if (reference === undefined && !module_exists) {
			return paths[dependency] = dependency;
		}

		args.push(reference);
	});

	if (!me.isEmpty(paths)) {
		me.config({
			paths: paths
		});

		return me.ready(me.arrayKeys(paths), function() {
			amd.require.invoke(factory, id);
		});
	}

	return factory.apply(null, args);
};

// Invoke the module.
amd.initialize();
// Define our module.
var loader = {
	callbacks: [],
	failed: 0,
	success: 0
};

// Module initializer.
loader.initialize = function() {
	me.log('loader', 'initialize');

	// Setup our reference here.
	loader.reference = global.document.getElementsByTagName('head')[0];

	// Import the module.
	me.internal('loader', loader);
};

// Default check for the loader, simply returns true.
loader.check = function() {
	me.log('loader', 'check');
	return true;
};

// Retrieve a list of unloaded dependencies for a module.
loader.dependencies = function(module) {
	me.log('loader', 'dependencies', module);

	var unprocessed = [];
	module = me.module(module, false);

	me.each(module.dependencies, function(dependency) {
		var module = me.module(dependency, false);

		if (module && !module.ready) {
			unprocessed.push(dependency);
		}
	});

	return unprocessed;
};

// Get the extension from the given path.
loader.extension = function(path) {
	me.log('loader', 'extension', path);

	var extension = 'js';

	if (!me.isString(path)) {
		return extension;
	}

	var subpath = path.split('/');
	subpath = subpath[subpath.length - 1].toLowerCase();

	// If there is no extension, assume javascript by default.
	if (subpath.indexOf('.') === -1) {
		return extension;
	}

	var ending = subpath.split('.');
	ending = ending[ending.length - 1];

	if (ending === 'css') {
		extension = 'css';
	}

	return extension;
};

// Load an individual resource.
loader.load = function(id, exports, paths, callback) {
	me.log('loader', 'load', id, exports, paths, callback);

	callback = me.callback(callback);

	if (me.isArray(id)) {
		paths = id;
		id = null;
	}

	var extension = loader.extension(me.arrayLast(paths));
	var module = me.internal(extension);

	if (!module) {
		module = loader;
	}

	loader.spawn(id, exports, me.arrayClone(paths), module, function(payload) {
		var module = me.module(payload.id, false);

		if (module) {
			module.failed = payload.failed;
			module.loaded = true;
			module.success = payload.success;
		}

		callback();
	});
};

// Process our factory reference.
loader.process = function(id, factory) {
	me.log('loader', 'process', id, factory);

	var module = me.module(id);
	var dependencies = loader.dependencies(id);

	if (dependencies.length) {
		return;
	}

	module.ready = true;

	if (module.factory === null) {
		return;
	}

	// If definition has already been processed, skip.
	if (module.processed) {
		return;
	}

	if (me.isFunction(factory)) {
		module.processed = me.internal('amd').require.invoke(factory, module);
	} else if (me.isObject(factory)) {
		// If it's an object, simply reference it.
		module.processed = factory;
	}
};

// Load modules and their dependencies.
loader.ready = function(modules, callback) {
	me.log('loader', 'ready', modules, callback);

	callback = me.callback(callback);

	if (me.isFunction(modules)) {
		callback = modules;
		modules = [];
	}

	if (me.isString(modules)) {
		modules = [modules];
	}

	if (!me.isArray(modules)) {
		return;
	}

	var parallel = [];

	me.each(modules, function(module) {
		var reference = me.module(module, false);

		// If the required module doesn't exist, skip, invalid or a global.
		// If module has been defined, it is already loaded, skip the loader.
		if (!reference || reference.ready) {
			return;
		}

		// If all dependencies have not been loaded, then skip.
		var dependencies = loader.dependencies(module);

		if (dependencies.length) {
			// Here we need to make sure that all dependencies are loaded properly before continuing.
			me.each(dependencies, function(dependency) {
				parallel.push(function(callback) {
					loader.ready(dependency, callback);
				});
			});

			return;
		}

		// At this point all dependencies have loaded, we need to process the function.
		if (!reference.ready) {
			parallel.push(function(callback) {
				loader.load(reference.id, reference.exports, reference.paths, function() {
					loader.process(reference.id, reference.factory);
					callback();
				});
			});
		}
	});

	if (parallel.length) {
		// We need to loop around again.
		return me.parallel(parallel, function() {
			loader.ready(modules, function() {
				me.module.initializer(modules);
				callback();
			});
		});
	}

	loader.ready.callback(modules, callback);
	loader.ready.invoke();
};

// Push to callbacks stack.
loader.ready.callback = function(modules, callback) {
	me.log('loader', 'ready.callback', modules, callback);

	loader.callbacks.push({
		callback: callback,
		modules: modules
	});
};

// Invoke any callbacks that are ready.
loader.ready.invoke = function() {
	me.log('loader', 'ready.invoke');

	var callbacks = [];
	var unprocessed = [];

	me.each(loader.callbacks, function(callback) {
		// If the following true, the callback is malformed, skip it.
		if (!me.isObject(callback) || !me.isArray(callback.modules) || !me.isFunction(callback.callback)) {
			return;
		}

		var wipe = false;

		// If there are no modules, then it depending on all modules to be loaded for this callback.
		if (callback.modules.length) {
			var count = 0;

			me.each(callback.modules, function(module) {
				module = me.module(module, false);

				if (!module) {
					count++;
					return;
				}

				if (module.ready) {
					count++;
				}
			});

			if (count === callback.modules.length) {
				wipe = true;
			}
		} else if (me.modulesCount === loader.success + loader.failed) {
			wipe = true;
		}

		if (wipe) {
			callbacks.push(callback.callback);
		} else {
			unprocessed.push(callback);
		}
	});

	// Reset the callbacks object to our unprocessed callbacks.
	loader.callbacks = unprocessed;

	// We need to process the callbacks here so that they may run in parallel/within nested callbacks without being stuck in a loop.
	me.each(callbacks, function(callback) {
		callback(null, me.success, me.failed);
	});
};

// Initialize the spawning of a resource.
loader.spawn = function(id, exports, paths, module, callback) {
	me.log('loader', 'spawn', id, exports, paths, module, callback);

	callback = me.callback(callback);

	var extension = loader.extension(me.arrayLast(paths));

	var payload = {
		callback: callback,
		exports: exports,
		extension: extension,
		failed: [],
		id: id,
		module: module,
		paths: paths,
		success: []
	};

	return loader.spawn.instance(payload);
};

// Check to see if the resource spawned properly.
loader.spawn.check = function(payload) {
	me.log('loader', 'spawn.check', payload);

	payload.module.check(payload.exports, function(success) {
		if (!success) {
			return loader.spawn.failed(payload);
		}

		return loader.spawn.success(payload);
	});
};

// Spawn a url from the resource.
loader.spawn.instance = function(payload) {
	me.log('loader', 'spawn.instance', payload);

	payload.path = payload.paths.shift();

	// Spawn our element.
	payload.element = me.internal(payload.extension).element();

	// Set the data-require-module attribute on the element.
	if (payload.id) {
		payload.element.setAttribute('data-require-module', payload.id);
	}

	// Attach the OnLoad event.
	payload.element.onload = function() {
		loader.spawn.check(payload);
	};

	// Attach the OnReadyStateChange event.
	payload.element.onreadystatechange = function() {	window.fucker =	payload.id;
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			this.onreadystatechange = null;
			loader.spawn.check(payload);
		}
	};

	// Attach the OnError event.
	payload.element.onerror = function() {
		loader.spawn.failed(payload);
	};

	// Set the source.
	me.internal(payload.extension).element.source(payload.element, me.uri(payload.path));

	// Invoke our element.
	loader.reference.appendChild(payload.element);

	return payload.element;
};

// Spawn failure callback.
loader.spawn.failed = function(payload) {
	me.log('loader', 'spawn.failed', payload);

	// Push our failed path for logging.
	payload.failed.push(payload.path);

	// If all paths have been exhausted.
	if (!payload.paths.length) {
		return loader.spawn.completed(payload);
	}

	// Attempt to spawn a fallback path.
	return loader.spawn.instance(payload);
};

// Spawn success callback.
loader.spawn.success = function(payload) {
	me.log('loader', 'spawn.success', payload);

	// Immediately process the AMD define queue on success.
	me.internal('amd').process(payload.id);

	payload.success.push(payload.path);
	loader.spawn.completed(payload);
};

// When spawn has completely finished.
loader.spawn.completed = function(payload) {
	me.log('loader', 'spawn.completed', payload);

	payload.callback(payload);
};

// Invoke the module.
loader.initialize();
// Define our module.
var javascript = {
	head: global.document.getElementsByTagName('head')[0]
};

// Module initializer.
javascript.initialize = function() {
	// Import the module.
	me.internal('js', javascript);
};

// Check to see if the resource exists.
javascript.check = function(exports, callback) {
	me.callback(callback)(javascript.isDefined(exports));
};

// Spawn our DOM element.
javascript.element = function() {
	var element = global.document.createElement('script');
	element.type = 'text/javascript';
	return element;
};

// Set our DOM elements source.
javascript.element.source = function(element, source) {
	element.src = source;
};

// Check to see if object exists.
javascript.isDefined = function(variable) {
	if (me.module(variable, false)) {
		return true;
	}

	return javascript.reference(variable) ? true : false;
};

// Obtain global object reference.
javascript.reference = function(variable) {
	try {
		var parts = variable.split('.');
		var part = global;

		for (var index in parts) {
			if (me.isDefined(part[parts[index]])) {
				part = part[parts[index]];
				continue;
			}

			return false;
		}

		return part;
	} catch (exception) {}

	return false;
};

// Invoke the module.
javascript.initialize();
// Define our module.
var stylesheet = {
	scannerAttempts: 5,
	scannerEnabled: true,
	scannerInterval: 50
};

// Module initializer.
stylesheet.initialize = function() {
	// Import the module.
	me.internal('css', stylesheet);
};

// Check to see if a stylesheet rule exists on the page.
stylesheet.check = function(exports, callback) {
	if (!stylesheet.scannerEnabled) {
		return callback(true);
	}

	return new stylesheet.scanner({
		rule: exports
	}, callback);
};

// Spawn our DOM element.
stylesheet.element = function() {
	var element = global.document.createElement('link');
	element.rel = 'stylesheet';
	return element;
};

// Set our DOM elements source.
stylesheet.element.source = function(element, source) {
	element.href = source;
};

// Construct the new scanner object.
stylesheet.scanner = function(input, callback) {
	this.attempts = stylesheet.scannerAttempts;
	this.callback = me.callback(callback);
	this.rule = input.rule;
	this.start();
};

// Start the interval.
stylesheet.scanner.prototype.start = function() {
	var scanner = this;

	return this.interval = setInterval(function() {
		scanner.tick();
	}, stylesheet.scannerInterval);
};

// Stop the interval.
stylesheet.scanner.prototype.stop = function() {
	return clearInterval(this.interval);
};

// Code to execute on each interval.
stylesheet.scanner.prototype.tick = function() {
	var defined = stylesheet.isDefined(this.rule);
	this.attempts--;

	if (this.attempts <= 0 || defined) {
		this.stop();
		this.callback(defined);
	}
};

// Check to see if the resource exists.
stylesheet.isDefined = function(selector) {
	var exists = false;

	if (me.isDefined(global.document.styleSheets)) {
		me.each(global.document.styleSheets, function(sheet) {
			var found = false;

			if (sheet.rules) {
				found = stylesheet.isDefinedScan(sheet.rules, selector);

				if (found) {
					exists = true;
					return -1;
				}
			}

			if (sheet.cssRules) {
				found = stylesheet.isDefinedScan(sheet.cssRules, selector);

				if (found) {
					exists = true;
					return -1;
				}
			}
		});
	}

	return exists;
};

// Scan stylesheet rules for our selector.
stylesheet.isDefinedScan = function(ruleset, selector) {
	var found = false;

	me.each(ruleset, function(rule) {
		if (rule.selectorText === selector) {
			found = true;
			return -1;
		}
	});

	return found;
};

// Invoke the initialization.
stylesheet.initialize();
// Define our module.
var migrate = {};

// Module initializer.
migrate.initialize = function() {
	me.ready = migrate.ready;
	me.load = migrate.load;
};

// Our legacy load function.
migrate.ready = function(modules, callback) {
	// @todo success and failed variables?
	if (me.isFunction(modules)) {
		callback = modules;
		modules = null;
	}

	callback = me.callback(callback);

	if (!modules) {
		var modules = me.args(callback);
		modules = modules.concat(me.arrayKeys(me.modules));
		modules = me.arrayUnique(modules);
	}

	//loader.ready
	amd.require(modules, callback);
};

// Our legacy load function.
migrate.load = function(paths, options) {
	if (!me.isObject(paths)) {
		return;
	}

	if (!me.isObject(options)) {
		options = {};
	}

	options.paths = paths;

	var callback = null;

	if (me.isDefined(options.callback)) {
		callback = options.callback;
	}

	loader.ready(me.arrayKeys(paths), callback);
};

// Invoke the module.
migrate.initialize();
// Define our module.
var requirejs = {};
// @todo dependencies on the shim
// Module initializer.
requirejs.initialize = function() {
	// Import the module.
	me.internal('requirejs', requirejs);

	// Refer to this modules bootstrap.
	me.callbacks.bootstrap.push(requirejs.bootstrap);
};

// Bootstrap our library.
requirejs.bootstrap = function(callback) {
	// RequireJS uses data-main attribute for it's autoloader.
	me.autoloader(['main']);

	// Refer to this modules config.
	me.callbacks.config.push(requirejs.config);

	callback();
};

// Altered configuration function.
requirejs.config = function(input, callback) {
	callback = me.callback(callback);

	// RequireJS uses baseUrl to set it's the base URL.
	if (me.isDefined(input.baseUrl) && me.isString(input.baseUrl)) {
		me.base = input.baseUrl;
	}

	callback();
};

// Bootstrap the library.
me.bootstrap();

global.fallback = me;
})(this);
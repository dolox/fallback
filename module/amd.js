/*global global, me*/

// Define our module.
var amd = {
	global: true,
	queue: []
};

// Module initializer.
amd.initialize = function() {
	me.log('amd', 'initialize');

	// Import the module.
	me.internal('amd', amd);

	// Refer to this modules bootstrap.
	me.callbacks.bootstrap.push(amd.bootstrap);
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

	// If the factory is empty, dub the dependencies as the factory.
	if (!factory) {
		factory = dependencies;
		dependencies = [];
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

	// Set the module as ready to be invoked.
	module.ready = true;
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

	amd.require.invoke(modules, factory);
};

// Invoke a require's factory when in a ready state.
amd.require.invoke = function(dependencies, factory, id, callback) {
	me.log('amd', 'invoke', factory, id);

	// If there's no factory, our input is malformed, skip.
	if (!factory) {
		return;
	}

	// Force our callback to a function.
	callback = me.callback(callback);

	var args = [];

	// If we have no dependencies, extract them from the factory.
	if (!dependencies) {
		dependencies = me.args(factory);
	}

	// Load all modules of dependencies, then invoke factory when ready.
	me.internal('loader').ready(dependencies, function() {
		var breakaway = false;
		var module_exists = id ? me.module(id, false) : false;
		var module_reference = module_exists ? module_exists : null;

		me.each(dependencies, function(dependency) {
			var dependency_exists = me.module(dependency, false);
			var dependency_reference;
			var reference;

			// If the module is one of these defaults, uniquely handle them.
			if (module_exists) {
				if (dependency === 'exports' || dependency === 'require') {
					reference = module_reference.local[dependency];
				} else if (dependency === 'module') {
					reference = module_reference;
				}
			}

			// If our reference still isn't set, get the processed function, if non-existant, use the exports.
			if (reference === undefined && dependency_exists) {
				dependency_reference = me.module(dependency);

				if (dependency_reference.processed === null) {
					if (me.isFunction(dependency_reference.factory)) {
						// If we have a function we need to execute it.
						amd.require.invoke(null, dependency_reference.factory, dependency, function(result) {
							dependency_reference.processed = result;
							amd.require.invoke(dependencies, factory, id, callback);
						});

						// Break out of the function.
						breakaway = true;

						return -1;
					} else if (dependency_reference.factory !== null) {
						// If it's not a function, simply reference it.
						dependency_reference.processed = dependency_reference.factory;
					} else if (dependency_reference.local.exports) {
						// As a last resort reference our exports.
						dependency_reference.processed = dependency_reference.local.exports;
					}
				}

				// Add our reference pointer.
				reference = dependency_reference.processed;
			}

			// If our reference still isn't set, try to grab from globals.
			if (me.globals === true && reference === null) {
				if (dependency === 'exports') {
					// Special case to set exports to global.
					reference = global;
				} else if (dependency_exists && dependency_reference) {
					var global_reference = me.internal('js').reference(dependency_reference.exports);
					reference = global_reference;
				} else if (me.isDefined(global[dependency])) {
					reference = global[dependency];
				}
			}

			args.push(reference);
		});

		if (breakaway) {
			return;
		}

		// Apply our arguments and invoke our callback.
		callback(factory.apply(null, args));
	});
};

// Invoke the module.
amd.initialize();
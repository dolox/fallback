/*global me, loader*/

// Define our module.
var migrate = {};

// Module initializer.
migrate.initialize = function() {
	fallback.importer = fallback.load = migrate.load;
	fallback.ready = migrate.ready;
};

// Our legacy load function.
migrate.load = function(paths, options) {
	if (!fallback.isObject(paths)) {
		return;
	}

	if (!fallback.isObject(options)) {
		options = {};
	}

	options.paths = paths;

	var callback = null;

	if (fallback.isDefined(options.callback)) {
		callback = options.callback;
	}

	loader.ready(fallback.arrayKeys(paths), callback);
};

// Our legacy ready function.
migrate.ready = function(modules, callback) {
	// @todo success and failed variables?
	if (fallback.isFunction(modules)) {
		callback = modules;
		modules = null;
	}

	callback = fallback.callback(callback);

	if (!modules) {
		var modules = fallback.args(callback);
		modules = modules.concat(fallback.arrayKeys(fallback.modules));
		modules = fallback.arrayUnique(modules);
	}

	//loader.ready
	amd.require(modules, callback);
};

// Invoke the module.
migrate.initialize();
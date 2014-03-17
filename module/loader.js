/*global global, me, window*/

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

	if (!me.isArray(modules) || !modules.length) {
		return callback();
	}

	var parallel = [];

	me.each(modules, function(module) {
		var reference_exists = me.module(module, false);

		// If module has been defined, it is already loaded, skip the loader.
		if (reference_exists && reference_exists.ready === true) {
			return;
		}

		// If the required module doesn't exist, auto config it.
		if (!reference_exists) {
			var paths = {};
			paths[module] = me.uri(module);
			me.config.paths(paths);
		}

		// Force the point to the actual object.
		var reference = me.modules[module];

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
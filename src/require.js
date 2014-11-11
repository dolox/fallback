/* global me */

// Load up and invoke our modules along with all of their dependencies. This function will first find all dependencies
// for our modules and them in reverse order. After loading them it'll then invoke them in reverse order. This needs to
// happen in 2 separate operation due to the possibility of anonymous modules having their own dependencies that we
// won't know about until it's actually been loaded.
me.require = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.require.args.apply(null, arguments);

	// Boot up our dependencies.
	me.require.boot(args.deps, function() {
		// At this point all of our dependencies have loaded, now we need to go ahead and invoke all of our dependencies in a
		// reverse order, that way our initial modules that invoked the `require` can be executed.
		me.require.invoke(args.deps);

		// Only attempt to invoke the `factory` if it's a `Function`.
		if (me.isFunction(args.factory)) {
			args.factory.apply(null, me.require.invoke.references(args.deps));
			//me.require.apply(args.deps, args.factory); @todo
		}
	});
};

// Fetch and normalize the arguments that are passed into our `require` function. The arguments for our `require`
// function can be sent in a number of different forms such as:
// (dependency) - Where `dependency` is a `String`.
// (dependencies) - Where `dependency` is a `Array`.
// (factory) - Where `factory` is a `Function`.
// (dependency, factory) - Where `dependency` is a `String` and `factory` is a `Function`.
// (dependencies, factory) - Where `dependencies` is a `Array` and `factory` is a `Function`.
me.require.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.arrayClone(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
		deps: null,
		factory: null
	};

	// If we only have a single argument, and it's a function, derive our dependencies from it.
	if (args.length === 1 && me.isFunction(args[0])) {
		payload.deps = me.args(args[0]);
		payload.factory = args[0];

		return payload;
	}

	// If we made it this far, treat the first argument has our dependecies, and the 2nd has is our factory.
	payload.deps = me.normalizeStringSeries(args[0]);

	// If a 2nd argument is defined, treat it as our factory.
	if (me.isDefined(args[1])) {
		payload.factory = args[1];
	}

	// Return back our normalized arguments.
	return payload;
};












// @todo at this point we know all deps have loaded, we just need to invoke them now! :D
me.require.invoke = function(deps) {
	var dependencies = me.require.dependencies(deps, true);
	dependencies.reverse();
	dependencies = dependencies.concat(deps);

	me.each(dependencies, function(dependency) {
		me.require.invoke.module(dependency);
	});
};

me.require.invoke.module = function(moduleName) {
	var module = me.module(moduleName, null, false);

	if (!module) {
		// @todo throw an exception to user
		return null;
	}

	if (!module.invoked) {
		module.invoked = true;

		if (me.isFunction(module.factory)) {
			module.factory = module.factory.apply(null, me.require.invoke.references(module.deps));
		}
	}

	return module.factory;
};

me.require.invoke.references = function(deps) {
	var references = [];

	if (!deps.length) {
		return references;
	}

	me.each(deps, function(dependency) {
		references.push(me.require.invoke.module(dependency));
	});

	return references;
};




// Load up all of our dependencies, along with any nested dependencies in reverse order.
me.require.boot = function(modules, callback) {
	// If our `deps` argument was malformed or empty, invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		callback();
		return;
	}

	// Boot up our anonymous modules first. If we're booting, halt the function and we'll loop back around.
	if (me.require.boot.anonymous(modules, callback)) {
		return;
	}

	me.require.boot.dependencies(modules, callback);
};

me.require.boot.dependencies = function(modules, callback) {
	var dependencies = me.require.dependencies(modules);

	// Loop around until we find the start of our dependency tree.
	if (dependencies.length) {
		return me.require.boot(dependencies, function() {
			me.require.module(modules, function() {
				var newDeps = me.require.dependencies(modules);

				if (newDeps.join() !== dependencies.join()) {
					return me.require.boot(newDeps, function() {
						me.require.module(modules, callback);
					});
				}
				//
				callback();
			});
		});
	}

	// Load the start of our dependency tree.
	me.require.module(modules, callback);
};


me.require.boot.anonymous = function(modules, callback) {
	// Store our anonymous modules that we need to load.
	var queue = me.require.anonymous(modules);

	// If we have anonymous modules that we need to load, do it now, then loop back around.
	if (queue.length) {
		me.require.boot.loop(queue, modules, callback);

		return true;
	}

	return false;
};


// Load up a queue of modules, then invoke the `me.require.deps` function again with the same parameters.
me.require.boot.loop = function(queue, modules, callback) {
	me.require.module(queue, function() {
		me.require.boot(modules, callback);
	});
};

// Configure an anonymous module with a path and definition.
me.require.config = function(moduleName) {
	// If we don't have a `moduleName`, then the invocation was malformed. Halt the function.
	if (!moduleName) {
		return false;
	}

	// Create our `Object` that we'll pass to our configuration `Function`.
	var config = {
		libs: {}
	};

	// Set our URL to be relative to our configurations `base` variable.
	config.libs[moduleName] = moduleName;

	// Pass the anonymous module over to our configuration to generate the module and URLs.
	return me.config(config);
};

// Load up an `Array` of modules simultaneously.
me.require.module = function(modules, callback) {
	// If we have no `modules`, then invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		callback();
		return;
	}

	// Store an `Array` of functions that we'll run simultaneously.
	var queue = [];

	// Loop and queue each of our modules.
	me.each(modules, function(moduleName) {
		queue.push(function(callback) {
			// Load the module onto the page.
			me.loader.boot(moduleName, callback);
		});
	});

	// Invoke the queue.
	me.parallel(queue, callback);
};



me.require.anonymous = function(modules) {
	// Store our queue of anonymous modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If our module doesn't exist, then it's a anonymous module that we need to load up first to find out what
		// dependencies are actually required for it.
		if (!module) {
			// Setup the configuration for our anonymous module.
			me.require.config(moduleName);

			// Push the module off to our queue.
			queue.push(moduleName);

			// Don't pass this point, as we can't figure out the dependencies for our module yet.
			return;
		}

		// Add any dependencies that are anonymous modules to our queue as well.
		queue = queue.concat(me.require.anonymous(module.deps));
	});

	// Return all of our queued anonymous modules.
	return queue;
};

me.require.dependencies = function(modules, loop) {
	// Store our queue of dependency modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If the module doesn't exist, or there aren't any dependencies, skip the iteration.
		if (!module || !module.deps.length) {
			return;
		}

		// Queue our dependencies.
		queue = queue.concat(module.deps);

		// If we explicity want a loop of all our dependencies, then we'll trace through them here.
		if (loop === true) {
			queue = queue.concat(me.require.dependencies(module.deps, loop));
		}
	});

	// Return all of our queued dependency modules.
	return queue;
};

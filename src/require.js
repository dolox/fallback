/* global me */

// Load up and invoke our modules along with all of their dependencies. This function will first find all dependencies
// for our modules and then attempt to load and invoke them from least to most dependent. This procedure needs to
// happen in 2 separate operations due to the possibility of anonymous modules having their own dependencies that we
// don't actually know about until after we've loaded it's file.
me.require = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.require.args.apply(null, arguments);

	// Boot up our dependencies.
	me.require.boot(args.deps, function() {
		// At this point all of our dependencies have loaded, now we need to go ahead and invoke all of our dependencies in
		// an order from least to most dependent, that way our initial `require` being requested can be invoked.
		me.require.invoke(args.deps);

		// Invoke our `factory` function with it's required dependency references.
		me.module.invoke.factory(args.factory, args.deps);
	});
};

// Load up all of our dependencies, along with any nested dependencies in the order of least to most dependent.
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

	// Boot our dependencies.
	me.require.boot.dependencies(modules, callback);
};

// Check to see if there's any anonymous modules waiting to be loaded, if there is, then we'll load them.
me.require.boot.anonymous = function(modules, callback) {
	// Store our anonymous module that we need to load.
	var queue = me.require.boot.anonymous.queue(modules);

	// If we have any anonymous modules that we need to load, do it now, then loop back around.
	if (queue.length) {
		me.require.loop(queue, modules, callback);

		// Explicitly return `true` so that we don't halt the loop.
		return true;
	}

	// By returning `false` we'll halt the anonymous module loop check.
	return false;
};

// Check to see if we have any dependencies which are anonymous modules that've yet to be loaded.
me.require.boot.anonymous.queue = function(modules) {
	// Store our queue of anonymous modules.
	var queue = [];

	// Loop through and fetch our dependencies.
	me.each(modules, function(moduleName) {
		// Reference our module definition.
		var module = me.module(moduleName, null, false);

		// If our module doesn't exist, then it's a anonymous module that we need to load up first to find out what
		// dependencies are actually required for it.
		if (!module) {
			// Push the module off to our anonymous list.
			me.require.anonymous.push(moduleName);

			// Setup the configuration for our anonymous module.
			me.require.config(moduleName);

			// Push the module off to our queue.
			queue.push(moduleName);

			// Don't pass this point, as we can't figure out the dependencies for our module yet.
			return;
		}

		// Loop and find any dependencies that are anonymous modules as well and queue them.
		queue = queue.concat(me.require.boot.anonymous.queue(module.deps));
	});

	// Return all of our queued anonymous modules.
	return queue;
};

// Load up all of the dependencies for the modules that are passed in.
me.require.boot.dependencies = function(modules, callback) {
	// Fetch all of the dependencies for our modules.
	var dependencies = me.module.dependencies(modules);

	// Loop around until we find the start of our dependency tree.
	if (dependencies.length) {
		// If we have dependencies, we're not at the start of the tree, keep looping around.
		return me.require.boot(dependencies, function() {
			// Load the modules.
			me.require.module(modules, function() {
				// Fetch the dependencies for our modules again.
				var newDependencies = me.module.dependencies(modules);

				// Determine if there are any new dependencies, since we've loaded our set of modules.
				if (newDependencies.join() !== dependencies.join()) {
					// Load up our new dependencies.
					return me.require.boot(newDependencies, function() {
						// Loop back around to see if any new dependencies have loaded from our set of newly loaded dependencies.
						me.require.module(modules, callback);
					});
				}

				// If we didn't have any new dependencies, then run our callback.
				callback();
			});
		});
	}

	// Load the start of our dependency tree.
	me.require.module(modules, callback);
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

// List of anonymously required modules.
me.require.anonymous = [];

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

// Assumes that all depdendencies being passed into the `deps` parameter have already been loaded. The sole purpose of
// this `Function` is to simply invoke the factories for each of the dependencies if they haven't already been invoked.
me.require.invoke = function(deps) {
	// Fetch any dependencies of our dependencies.
	var dependencies = me.module.dependencies(deps, true);

	// Reverse our dependency list as our fetcher method loops through finding most to least dependent, we actually need
	// to invoke each `factory` from least to most dependent.
	dependencies.reverse();

	// Append our initial dependencies to the bottom of our list to be invoked last.
	dependencies = dependencies.concat(deps);

	// Loop through each of the dependencies in our list that we need to invoke.
	me.each(dependencies, function(dependency) {
		// Invoke our dependency.
		me.module.invoke(dependency);
	});
};

// Load up a queue of modules, then run `require.boot` to check and make sure all modules along with their dependencies
// have successfully loaded. This `Function` is being to used to exhaust all dependencies. In the case of anonymous
// modules, we may load up a file and find out we have new dependencies that must be loaded, this `Function` is taking
// care of that.
me.require.loop = function(queue, modules, callback) {
	// Load any modules in our queue.
	me.require.module(queue, function() {
		// Run back to `require.boot` and attempt to boot up the modules originally requested.
		me.require.boot(modules, callback);
	});
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
		// Push our anonymous `Function` off to our parallel queue.
		queue.push(function(callback) {
			// Load the module onto the page.
			me.loader.boot(moduleName, callback);
		});
	});

	// Invoke the queue.
	me.parallel(queue, callback);
};

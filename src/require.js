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
	}, function(errors) {
		if (me.isFunction(args.error)) {
			args.error(errors);
		}
	});
};

// Load up all of our dependencies, along with any nested dependencies in the order of least to most dependent.
me.require.boot = function(modules, successCallback, errorCallback) {
	// If our `deps` argument was malformed or empty, invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		successCallback();
		return;
	}

	// Boot up our anonymous modules first. If we're booting, halt the function and we'll loop back around.
	if (me.require.boot.anonymous(modules, successCallback, errorCallback)) {
		return;
	}

	// Boot our dependencies.
	me.require.boot.dependencies(modules, successCallback, errorCallback);
};

// Check to see if there's any anonymous modules waiting to be loaded, if there is, then we'll load them.
me.require.boot.anonymous = function(modules, successCallback, errorCallback) {
	// Store our anonymous module that we need to load.
	var queue = me.require.boot.anonymous.queue(modules);

	// If we have any anonymous modules that we need to load, do it now, then loop back around.
	if (queue.length) {
		me.require.loop(queue, modules, successCallback, errorCallback);

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
me.require.boot.dependencies = function(modules, successCallback, errorCallback) {
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
						me.require.module(modules, successCallback, errorCallback);
					});
				}

				// If we didn't have any new dependencies, then run our callback.
				successCallback();
			}, errorCallback);
		}, errorCallback);
	}

	// Load the start of our dependency tree.
	me.require.module(modules, successCallback, errorCallback);
};

// Fetch and normalize the arguments that are passed into our `require` function. The arguments for our `require`
// `Function` can be sent in a number of different forms.
me.require.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.arrayClone(arguments);

	// Route the arguments.
	args = me.require.args.router(args);

	// Return back our normalized arguments.
	return me.require.args.normalize(args);
};

// Normalize the arguments payload.
me.require.args.normalize = function(payload) {
	// Normalize the `error` `Function`.
	payload.error = me.normalizeFunction(payload.error);

	// Normamlize the `dependencies` `Array`.
	payload.deps = payload.deps ? me.normalizeStringSeries(payload.deps) : null;

	// Normalize the `factory` `Function`.
	payload.factory = me.normalizeFunction(payload.factory);

	// Return the noramlized `payload`.
	return payload;
};

// Route the arguments passed into the `require` `Function`.
me.require.args.router = function(args) {
	// We'll fill up these variables based on the arguments.
	var payload = {
		error: null,
		deps: null,
		factory: null
	};

	// Determine the router `Function` that we need to invoke.
	var reference = args.length > 3 ? 3 : args.length;

	// Invoke the router `Function` with the arguments and payload.
	payload = me.require.args.router[reference](args, payload);

	// If we need to derive the `dependencies` from the `factory` `Function`, then do so now.
	if (!me.isString(payload.deps) && !me.isArray(payload.deps) && me.isFunction(payload.factory)) {
		payload.deps = me.args(payload.factory);
	}

	// Return our factored payload.
	return payload;
};

// Handle no arguments being passed into the `require` `Function`.
me.require.args.router[0] = function(args, payload) {
	// Throw an error to the end user.
	me.log(1, 'require', 'args', 'No arguments were passed into `require`! Halting!', args);

	// Return our factored payload.
	return payload;
};

// Handle 1 argument being passed into the `require` `Function`.
me.require.args.router[1] = function(args, payload) {
	// If it's a `Function`, derive our dependencies from it.
	if (me.isFunction(args[0])) {
		// Reference the factory.
		payload.factory = args[0];

	// If it's an `Array` or `String` it's the `dependencies`.
	} else if (me.isArray(args[0]) || me.isString(args[0])) {
		payload.deps = args[0];

	// If none of the criteria above matched, then the arguments are malformed.
	} else {
		me.log(1, 'require', 'args', '1 argument was passed into `require` that was malformed! Discarding!', args);
	}

	// Return our factored payload.
	return payload;
};

// Handle 2 arguments being passed into the `require` `Function`.
me.require.args.router[2] = function(args, payload) {
	// If both arguments are a `Function` then treat them as the `factory` and `error` callbacks.
	if (me.isFunction(args[0]) && me.isFunction(args[1])) {
		// Reference the `error` `Function`.
		payload.error = args[1];

		// Reference the `factory` `Function`.
		payload.factory = me.normalizeFunction(args[0]);

	// Otherwise treat the arguments as the `dependencies` and `factory`.
	} else if (me.isArray(args[0]) || me.isString(args[0])) {
		// Reference the `dependencies`.
		payload.deps = args[0];

		// Reference the `factory`.
		payload.factory = args[1];

	// If none of the criteria above matched, then the arguments are malformed.
	} else {
		me.log(1, 'require', 'args', '2 arguments were passed into `require` that were malformed! Discarding!', args);
	}

	// Return our factored payload.
	return payload;
};

// Handle 3 arguments being passed into the `require` `Function`.
me.require.args.router[3] = function(args, payload) {
	// Reference the `dependencies`.
	payload.deps = args[0];

	// Reference the `factory`.
	payload.factory = me.normalizeFunction(args[1]);

	// Reference the `error`.
	payload.error = me.normalizeFunction(args[2]);

	// Return our factored payload.
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
me.require.loop = function(queue, modules, successCallback, errorCallback) {
	// Load any modules in our queue.
	me.require.module(queue, function() {
		// Run back to `require.boot` and attempt to boot up the modules originally requested.
		me.require.boot(modules, successCallback, errorCallback);
	}, errorCallback);
};

// Load up an `Array` of modules simultaneously.
me.require.module = function(modules, successCallback, errorCallback) {
	// If we have no `modules`, then invoke our callback and halt the function.
	if (!me.isArray(modules) || !modules.length) {
		successCallback();
		return;
	}

	// Store an `Array` of functions that we'll run simultaneously.
	var queue = [];

	// Loop and queue each of our modules.
	me.each(modules, function(moduleName) {
		// Push our anonymous `Function` off to our parallel queue.
		queue.push(function(callback) {
			// Load the module.
			me.module.boot(moduleName, callback, callback);
		});
	});

	// Invoke the queue along with the callback handler.
	me.parallel(queue, function() {
		me.require.module.callback(modules, successCallback, errorCallback);
	});
};

// Handle the callback after loading modules to check if there were errors.
me.require.module.callback = function(modules, successCallback, errorCallback) {
	// Store any errors in this `Array`.
	var errors = [];

	// Loop through each of modules and see if there were any errors.
	me.each(modules, function(moduleName) {
		// Fetch a reference of the module.
		var module = me.module(moduleName);

		// If there's no successful, but there are failed URLs, then the module failed to load.
		if (!module.loader.success && module.loader.failed.length) {
			errors.push({
				module: moduleName,
				message: 'Failed to load.'
			});
		}
	});

	// If we have errors, fire off our error callback.
	if (errors.length) {
		return errorCallback(errors);
	}

	// Fallback on our success callback.
	successCallback();
};

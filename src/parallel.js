// Run a number of functions in parallel with the ability to call a single callback once they've all completed.
me.parallel = function(factories, callback) {
	// Our `factories` argument must be an `Array`, if not halt the function.
	if (!me.isaArray(factories)) {
		callback();
		return;
	}

	// Normalize our `factories`.
	factories = me.normalizeFunctionSeries(factories, null, true);

	// Generate a new queue instance.
	var guid = me.parallel.generate(factories.length);

	// Loop through all of our refernces and execute them.
	me.each(factories, function(factory) {
		// Anonymous spawn and track our `Function` to invoke.
		me.parallel.anonymous(factory, guid, callback);
	});
};

// Our anonymous functions that we're executing in parallel.
me.parallel.anonymous = function(factory, guid, callback) {
	// If our `factory` parameter isn't a `Function`, halt the `Function`.
	if (!me.isFunction(factory)) {
		return;
	}

	// Normalize our `guid` parameter.
	guid = me.normalizeString(guid, me.guid(true));

	// Normalize our `callback` paramter.
	callback = me.normalizeFunction(callback);

	// Invoke our queued function.
	factory(function() {
		// Reference the instance of our parallel runner.
		var parallel = me.parallel.queue[guid];

		// If the `guid` is not defined in our queue, then it was cancelled.
		if (!me.isDefined(parallel)) {
			return callback(false);
		}

		// Increment our callback invocation count.
		parallel.interval++;

		// If all of our functions ran successful, process our final callback and clear our memory of the queue.
		if (parallel.interval === parallel.length) {
			// Remove our runner instance from the queue.
			delete me.parallel.queue[guid];

			// Fire off our final callback, as the queue has been exhausted.
			callback(true);
		}
	});
};

// Generate a new parallel instance into our queue.
me.parallel.generate = function(length) {
	// Generate a unique identifier for our parallel instance to avoid collisions.
	var guid = me.guid(true);

	// Add the our `references` to our parallel queue.
	me.parallel.queue[guid] = {
		// The number of callbacks that were invoked.
		interval: 0,

		// The total number of callbacks to run in parralel.
		length: length
	};

	return guid;
};

// Container `Object` for all of the currently running parallel jobs.
me.parallel.queue = {};

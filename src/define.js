/* global me */

// Defining anonymous and named modules for our library is done through this function. There are a number of ways to
// pass arguments into this function, for more details see comments in the `me.define.args` function.
me.define = function() {
	// Fetch and normalize the argument that were passed in.
	var args = me.define.args.apply(null, arguments);

	// If a name and factory weren't passed in, throw a notice to the end user and halt our function.
	if (!args.name && !args.factory) {
		me.warn('define', 'No `name` or `factory` sent to the `define` function! Halting!', args);
		return;
	}

	// Fill up our dependencies.
	args = me.define.deps(args);

	// If we're attempting to define an anonymous module, and we already have an anonymous module that was previously
	// passed to the function before we had a chance to actually declare it's name, then there was 2 anonymous modules
	// which were passed in through a single file. We cannot due this due to the fact that we have no way of knowing which
	// name should be assigned to which `define` instance that was called. If we did allow this to go through, we would
	// essentially be overwriting our previous anonymous module. If this happens we'll simply halt the function and a
	// throw a notice to our end user.
	if (!args.name && me.define.anonymous.factory) {
		me.warn('define', 'Multiple Anonymous modules defined in the same file! Halting!', args);
		return;
	}

	// If we don't have a name for our module, then we'll define it as an anonymous module. Our callback that loaded our
	// file will see this and set the proper name once the callback executes, which will happen synchronously.
	if (!args.name) {
		me.define.anonymous.save(args);
		return;
	}

	// Generate our new module and reference it as our last defined module.
	me.define.module.last = me.define.module(args);

	// Reset any anonymous modules that were waiting in limbo. If we don't configure a module, use the `require` function
	// to load it,and the file that loads has explicitly define the module name, then we no longer need this anonymous
	// definition since the name was explicitly defined.
	me.define.anonymous.reset();
};

// If a module is sitting in an anonymous state and waiting to be imported properly, this function will take the
// `dependencies` and `factory from that anonymous module, import them in to our properly named module, and then
// destroy the anonymous module sitting in a limbo state. Here's how this system of defining anonymous modules works:
// If we attempt to load a module via our `require` function, and that module doesn't happen to exist in our
// configuration, we'll automatically spawn a new anonymous module for it. Once the file for the module has loaded, if
// the file contains an anonymous `define` call, we'll then store it in a limbo state with it's `factory` and
// `dependencies`. The issue is that the `define` function will be invoked before the `onload` callback from our
// script file that was loaded for our module, so we have to store it in a limbo state, and then after the callback
// executes, we then look to see if an anonymous module is waiting to be defined, if so, we then define it whatever
// anonymous module that's sitting in a limbo state with the name of the module that was given from our callback. If
// our callback provides a `define` function with a name, any anonymous modules sitting in a limbo state will be wiped
// out completely.
me.define.anonymous = function(moduleName) {
	// If we don't have a anonymous module waiting to be defined, then halt the function. We should at the very least have
	// either a `factory` or reference to the last defined module (which in this case would be our anonymous module
	// without a name).
	if (!me.define.anonymous.factory && !me.define.module.last) {
		return;
	}

	// Fetch the instance of our module.
	var module = me.module(moduleName, null, false);

	// If we couldn't find our module, then something went wrong. Let the end user know and halt the `Function`.
	if (!module) {
		me.warn('define', 'anonymous', 'Anonymous module not found for `' + moduleName + '`! Halting definition!');
		return;
	}

	// If our module exists and there's module that's set as our last, then it's not anonymous. Halt the `Function`.
	if (module && me.define.module.last) {
		return;
	}

	// Set the dependencies for our anonymous `module`.
	module.deps = me.define.anonymous.deps;

	// Set the factory for our anonymous `module`.
	module.factory = me.define.anonymous.factory;

	// Reset the pending anonymous values waiting to be populated.
	me.define.anonymous.reset();
};

// The dependencies for our anonymous `module` waiting to be properly defined.
me.define.anonymous.deps = null;

// The factory for our anonymous `module` waiting to be properly defined.
me.define.anonymous.factory = null;

// Clear out any saved anonymous `module` properties.
me.define.anonymous.reset = function() {
	// Clear the dependencies.
	me.define.anonymous.deps = null;

	// Clear the factory.
	me.define.anonymous.factory = null;
};

// Store the anonymous module waiting to be defined.
me.define.anonymous.save = function(args) {
	// Remove the reference for our last defined module.
	me.define.module.last = null;

	// Set the dependencies for our anonymous module.
	me.define.anonymous.deps = args.deps;

	// Set the factory for our anonymous module.
	me.define.anonymous.factory = args.factory;
};

// Handle the arguments for our define function in a special way. In certain cases only 1, 2 or 3 parameters may be
// passed to the `Function`. This `Function` will determine what those parameters should be defined as.
me.define.args = function() {
	// Convert our `arguments` into an `Array`.
	var args = me.toArray(arguments);

	// We'll fill up these variables based on the arguments.
	var payload = {
		deps: null,
		factory: null,
		name: null
	};

	// If we have no arguments, halt our function.
	if (!args.length) {
		return payload;
	}

	// If we only got a single argument, treat it as the factory.
	if (args.length === 1) {
		payload.factory = args[0];

		return payload;
	}

	// If we have 2 arguments, then there's some special checks here.
	if (args.length === 2) {
		// The last parameter in this case will always be our factory.
		payload.factory = args[1];

		// If our first argument happens to be a string, treat it as the name.
		if (me.isString(args[0])) {
			payload.name = args[0];

			return payload;
		}

		// If our first argument wasn't a string, treat it as the `deps` or discard it.
		payload.deps = me.isArray(args[0]) ? args[0] : null;

		return payload;
	}

	// If we have more 3 or more arguments, ignore everything after the 3rd argument.
	payload.deps = args[1];
	payload.factory = args[3];
	payload.name = args[0];

	// Return our normalized payload of parameters.
	return payload;
};

// Fill up our dependencies based on our arguments if we need to.
me.define.deps = function(args) {
	// If we already have our dependencies defined, then skip the function.
	if (args.deps) {
		return args;
	}

	// If our factory isn't a function, and our dependcies are empty, then we have no dependencies.
	if (!me.isFunction(args.factory)) {
		args.deps = [];
		return args;
	}

	// If we made it this far, set the arguments from our factory as our dependencies.
	args.deps = me.args(args.factory);

	// Send back our arguments array with our populated dependencies.
	return args;
};

// Generate and return our new module.
me.define.module = function(args) {
	// Generate the module.
	return me.module.define(args.name, {
		// Set our dependencies.
		deps: args.deps,

		// Set our factory.
		factory: args.factory,

		// Explicity flag that the module has been loaded, that way when we reference it, we don't attempt to load it.
		loader: {
			loaded: true
		}
	});
};

// Our last defined module reference. This is used to reference the proper names with our anonymous modules.
me.define.module.last = null;

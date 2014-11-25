// Defining anonymous and named modules for our library is done through this function. There are a number of ways to
// pass arguments into this function, for more details see comments in the `me.define.args` function.
me.define = function() {
	// Fetch and normalize the argument that were passed in.
	var args =	me.amd.args(arguments, me.define.args.router, 3, me.define.args.normalize, {
		name: null,
		error: null,
		deps: null,
		factory: undefined
	});

	// Fill up our dependencies.
	args = me.define.deps(args);

	// If we're attempting to define an anonymous module, and we already have an anonymous module that was previously
	// passed to the function before we had a chance to actually declare it's name, then there was 2 anonymous modules
	// which were passed in through a single file. We cannot due this due to the fact that we have no way of knowing which
	// name should be assigned to which `define` instance that was called. If we did allow this to go through, we would
	// essentially be overwriting our previous anonymous module. If this happens we'll simply halt the function and a
	// throw a notice to our end user.
	if (!args.name) {
		// We cannot define multiple anonymous modules with the same name!
		if (me.define.anonymous.pending) {
			me.log(1, 'define', 'Multiple Anonymous modules defined in the same file! Halting!', args);
			return;
		}

		// If we don't have a name for our module, then we'll define it as an anonymous module. Our callback that loaded our
		// file will see this and set the proper name once the callback executes, which will happen synchronously.
		me.define.anonymous.save(args);
		return;
	}

	// Generate our new module and reference it as our last defined module.
	me.define.module.last = me.define.module(args);

	// Flag the anonymous modules as not pending.
	me.define.anonymous.pending = false;
};

// Whether or not to enforce the use of AMD. If this setting it turned on via the `config` `Function`, any library that
// supports AMD will not longer be available via the `window` `global`. See documentation for further details.
me.define.amd = undefined;

// If a module is sitting in an anonymous state and waiting to be imported properly, this `Function` will take the
// `dependencies` and `factory` from that anonymous module, import them in to our properly named module, and then
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
	if (!me.define.anonymous.pending && !me.define.module.last) {
		return;
	}

	// Fetch the instance of our module.
	var module = me.module(moduleName, null, false);

	// If we couldn't find our module, then something went wrong. Let the end user know and halt the `Function`.
	if (!module) {
		me.log(1, 'define', 'anonymous', 'Anonymous module not found for `' + moduleName + '`! Halting definition!');
		return;
	}

	// If our module already exists and there's a module that's set as our last defined, then a file was loaded which the
	// library assumed was anonymous, but wound up being explicitly calling the `define` `Function` with a `name`. In this
	// particular case, we'll destroy the new definition and instead alias it with our anonymous module.
	if (module && me.define.module.last) {
		// Define the alias coming from the `define` function for the anonymous file that was loaded.
		me.module.alias(module.name, [me.define.module.last.name]);

		// Attempt to fetch the index of our anonymous module from our require library.
		var anonymousIndex = me.indexOf(me.require.anonymous, moduleName);

		// Reference the factory from the file that was loaded if the current factory is `undefined`.
		if (anonymousIndex !== -1) {
			// Remove the anonymous entry.
			me.require.anonymous.splice(anonymousIndex, 1);

			// Reference the factory.
			module.factory = me.define.module.last.factory;
		}

		// Delete the actually module reference.
		delete me.module.definitions[me.define.module.last.name];
	} else {
		// Set the dependencies for our anonymous `module`.
		module.deps = me.define.anonymous.deps;

		// Set the factory for our anonymous `module`.
		module.factory = me.define.anonymous.factory;
	}

	// Reset the pending anonymous values waiting to be populated.
	me.define.anonymous.reset();
};

// The dependencies for our anonymous `module` waiting to be properly defined.
me.define.anonymous.deps = undefined;

// The factory for our anonymous `module` waiting to be properly defined.
me.define.anonymous.factory = undefined;

// Flag whether or not an anonymous module is pending to be defined.
me.define.anonymous.pending = false;

// Clear out any saved anonymous `module` properties.
me.define.anonymous.reset = function() {
	// Clear the pending state.
	me.define.anonymous.pending = false;

	// Clear the dependencies.
	me.define.anonymous.deps = undefined;

	// Clear the factory.
	me.define.anonymous.factory = undefined;
};

// Store the anonymous module waiting to be defined.
me.define.anonymous.save = function(args) {
	// Remove the reference for our last defined module.
	me.define.module.last = null;

	// Reset the previously saved values if present.
	me.define.anonymous.reset();

	// If the `args` parameter isn't an `Object`, halt the `Function`.
	if (!me.isObject(args)) {
		return;
	}

	// Flag the pending state.
	me.define.anonymous.pending = true;

	// Set the dependencies for our anonymous module.
	if (me.isDefined(args.deps)) {
		me.define.anonymous.deps = args.deps;
	}

	// Set the factory for our anonymous module.
	if (me.isDefined(args.factory)) {
		me.define.anonymous.factory = args.factory;
	}
};

// Route and normalize the arguments that are passed into our `define` function. The arguments for our `define`
// `Function` can be sent in a number of different forms.
me.define.args = {};

// Normalize the arguments payload.
me.define.args.normalize = function(payload) {
	// Normalize the `name` `String`.
	payload.name = me.normalizeString(payload.name);

	// Normalize the `error` `Function`.
	payload.error = me.normalizeFunction(payload.error);

	// Normamlize the `dependencies` `Array`.
	payload.deps = payload.deps ? me.normalizeStringSeries(payload.deps) : null;

	// Don't normalize the `factory`, as it can be anything except `undefined`.

	// Return the noramlized `payload`.
	return payload;
};

// Route the arguments passed into the `define` `Function`.
me.define.args.router = [];

// Handle no arguments being passed into the `define` `Function`.
me.define.args.router[0] = function(args, payload) {
	// Throw an error to the end user.
	me.log(1, 'define', 'args', 'No arguments were passed into `define`! Halting!', args);

	// Return our factored payload.
	return payload;
};

// Handle 1 argument being passed into the `define` `Function`.
me.define.args.router[1] = function(args, payload) {
	// Reference the `factory`.
	payload.factory = args[0];

	// Return our factored payload.
	return payload;
};

// Handle 2 arguments being passed into the `define` `Function`.
me.define.args.router[2] = function(args, payload) {
	// If the first argument is a `String`, treat the arguments as `name`, and `factory`.
	if (me.isString(args[0])) {
		// Reference the `name`.
		payload.name = args[0];

		// Reference the `factory`.
		payload.factory = args[1];

	// If the first argument is an `Array`, treat the arguments as `dependencies`, and `factory`.
	} else if (me.isaArray(args[0])) {
		// Reference the `dependencies`.
		payload.deps = args[0];

		// Reference the `factory`.
		payload.factory = args[1];

	// If none of the criteria above matched, then the arguments are malformed.
	} else {
		me.log(1, 'define', 'args', '2 arguments were passed into `define` that were malformed! Discarding!', args);
	}

	// Return our factored payload.
	return payload;
};

// Handle 3 arguments being passed into the `define` `Function`.
me.define.args.router[3] = function(args, payload) {
	// Reference the `name`.
	payload.name = args[0];

	// Reference the `dependencies`.
	payload.deps = args[1];

	// Reference the `factory`.
	payload.factory = args[2];

	// Return our factored payload.
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
	// Generate or reference the module.
	var module = me.module(args.name);

	// Set our dependencies.
	module.deps = me.normalizeStringSeries(args.deps);

	// Set our error.
	module.error = me.normalizeFunction(args.error);

	// Set our factory.
	module.factory = args.factory;

	// Explicity flag that the module has been loaded, that way when we reference it, we don't attempt to load it.
	module.loader.loaded = true;

	// Return a reference to the module.
	return module;
};

// Our last defined module reference. This is used to reference the proper names with our anonymous modules.
me.define.module.last = null;

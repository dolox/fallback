// Common functionality for both the `define` and `require` `Functions`.
var amd = {};

// Route and normalize the arguments.
amd.args = function(args, router, normalizer, payload) {
	// Convert our `arguments` into an `Array`.
	args = me.arrayClone(args);

	// Route the arguments.
	args = amd.router(args, router, 3, payload);

	// Return back our normalized arguments.
	return normalizer(args);
};

// Route a set of arguments.
amd.router = function(args, router, maxlength, payload) {
	// Determine the router `Function` that we need to invoke.
	var reference = args.length > maxlength ? maxlength : args.length;

	// Invoke the router `Function` with the arguments and payload.
	payload = router[reference](args, payload);

	// If we need to derive the `dependencies` from the `factory` `Function`, then do so now.
	if (!me.isString(payload.deps) && !me.isaArray(payload.deps) && me.isFunction(payload.factory)) {
		payload.deps = me.args(payload.factory);
	}

	// Return our factored payload.
	return payload;
};

// Reference the module within the library.
me.amd = amd;

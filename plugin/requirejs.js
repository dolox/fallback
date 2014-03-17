/*global me*/

// Define our module.
var requirejs = {};
// @todo dependencies on the shim
// Module initializer.
requirejs.initialize = function() {
	// Import the module.
	fallback.internal('requirejs', requirejs);

	// Refer to this modules bootstrap.
	fallback.callbacks.bootstrap.push(requirejs.bootstrap);
};

// Bootstrap our library.
requirejs.bootstrap = function(callback) {
	// RequireJS uses data-main attribute for it's autoloader.
	fallback.autoloader(['main']);

	// Refer to this modules config.
	fallbackcallbacks.config.push(requirejs.config);

	callback();
};

// Altered configuration function.
requirejs.config = function(input, callback) {
	callback = fallback.callback(callback);

	// RequireJS uses baseUrl to set it's the base URL.
	if (fallback.isDefined(input.baseUrl) && fallback.isString(input.baseUrl)) {
		fallback.base = input.baseUrl;
	}

	callback();
};
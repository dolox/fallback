/* global me */

// JavaScript loader which is responsible for loading any scripts for the library.
me.loader.js = {};

// Attempt to load a script onto the page.
me.loader.js.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already loaded on the page, don't attempt to reload it.
	var factory = me.loader.js.check(module, false);

	// Check if our module has already been loaded.
	if (factory) {
		return callbackSuccess(module, url, 'predefined', factory);
	}

	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url);
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		// Attempt to fetch the factory for our module.
		factory = me.loader.js.check(module);

		// If the factory is empty, then it failed to load! Invoke the failure callback.
		if (!me.isDefined(factory)) {
			return failed();
		}

		// We passed the checks, invoke the success callback.
		return callbackSuccess(module, url, 'success', factory);
	};

	// Spawn a new element on the page contained our URL with our callbacks.
	return me.loader.js.element(url, check, failed);
};

// Sift through the script elements on the page and attempt to derive the values from `attribute` that is passed in to
// the `Function`. Along with checking the `attribute` that is passed in, this `Function` will also prefix the
// given `attribute` with `data-` and check for that attribute as well. For example if the `Function` was called with
// `base`, then the `Function` will atempt to derive values for the attributes `base` and `data-base`.
me.loader.js.attributes = function(attribute) {
	// The `Array` to store our `attribute` values.
	var values = [];

	// If the `attribute` is not a string, halt the `Function`.
	if (!me.isString(attribute)) {
		return values;
	}

	// Fetch all script tags that are on the page. The if statement is for test coverage.
	var scripts = global.document ? global.document.getElementsByTagName('script') : null;

	// Check to make sure that we retrieved a `HTMLCollection`, otherwise halt the `Function`.
	if (!me.isType(scripts, 'HTMLCollection')) {
		return values;
	}

	// Loop through each of our scripts.
	me.each(scripts, function(script) {
		// If our script instance isn't an `HTMLScriptElement`, then skip the iteration.
		if (!me.isType(script, 'HTMLScriptElement')) {
			return;
		}

		// If `getAttribute` isn't a `Function`, then we're not looking at a HTML element, skip it. For legacy IE the
		// `getAttribute` method is declared as `Object`.
		if (!me.isObject(script.getAttribute) && !me.isFunction(script.getAttribute)) {
			return;
		}

		// Check to see if our `attribute` exists along with the prefix `data-` for the `attribute` in questino.
		me.each([attribute, 'data-' + attribute], function(attribute) {
			// Store our attribute value.
			var value = null;

			// We need to wrap this in a try catch because we cannot properly detect the method in legacy browsers. @ie
			// Fetch the value for the attribute.
			try {
				// Fetch our attribute.
				value = script.getAttribute(attribute);
			} catch (exception) {}

			// If the value exists then use it.
			if (value) {
				// Split our value on `,` that way we can pass in multiple values.
				value = value.split(',');

				// Merge our values.
				values = values.concat(value);
			}
		});
	});

	// Return the values for attributes.
	return values;
};

// Check to see if a module has already been loaded on the page. This `Function` will return `Boolean`, `true` being
// that a module has already been loaded and `false` being that it hasn't.
me.loader.js.check = function(module, fallback) {
	// See if the module itself has been flagged as loaded.
	if (module.loader.loaded === true) {
		return true;
	}

	// If an anonymous moduel was defined, then it's for this library, meaning it loaded successfully.
	if (me.isDefined(me.define.anonymous.factory)) {
		return true;
	}

	// If the user added their own custom checking function, invoke it now to preform the check.
	if (me.isFunction(module.check)) {
		return module.check();
	}

	// If globals are enabled, and we have exports for the module, check the `window` to see if they're defined.
	if (me.globals === true && module.exports.length) {
		return me.loader.js.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return me.isDefined(fallback) ? fallback : true;
};

// Check for the instance of our library based on the exports given. If the instance of our library exists it'll be
// returned, otherwise this function will return `null. The `Function` basically checks the `window` variable for a
// subkey which are the exports that are specified in the paramter.
me.loader.js.check.exports = function(exports) {
	// If our `exports` parameter is not an `Array`, cast it to one.
	if (!me.isArray(exports)) {
		exports = [exports];
	}

	// Storage for our factory value.
	var factory = null;

	// If we have no exports, return `null`.
	if (!exports.length) {
		return factory;
	}

	// Loop through each of our exports variable, until we find a match.
	me.each(exports, function(variable) {
		// We have to explicity use `eval` because variables will come in many forms. In particular sometimes they will come
		// in the form of being a child of an object. For example `jQuery UI` loads under the `glboal` variable `jQuery.ui`.
		// In order for us to get to this programtically we have to use `eval`.
		try {
			/*eslint-disable*/
			factory = eval('window.' + variable);
			/*eslint-enable*/

			// If our `factor`y is undefined, force the variable back to a `null`.
			if (!me.isDefined(factory)) {
				factory = undefined;
			}
		} catch (exception) {
			// Let the end user know that we hit an exception due to their malformed `exports` variable.
			me.log(2, 'loaderJavaScript', '`fallback.loader.js.check.exports` threw an exception.', exception);
		}
	});

	// Return the factory for our library.
	return factory;
};

// Spawn a new element on the page with our URL.
me.loader.js.element = function(url, success, failed) {
	// Create a new script element instance.
	var element = global.document.createElement('script');

	// The browser supports it, enable crossorigin.
	element.crossorigin = true;

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = success;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events. @ie
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			success();
		}
	};

	// Set the actual URL that we're going to request to load for our library.
	element.src = url;

	// Set the type, some legacy browsers require this attribute be present.
	element.type = 'text/javascript';

	// Load our URL on the page.
	return me.head.appendChild(element);
};

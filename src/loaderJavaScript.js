/* global me */

// JavaScript loader which is responsible for loading any scripts for the library.
me.loader.js = {};

// Attempt to load a script onto the page.
me.loader.js.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already loaded on the page, don't attempt to reload it.
	var factory = me.loader.js.check(module);
	//console.log(module);
	// @todo we need to check if its already on the page*#@$%()
	//if (factory) {
	//	return callbackSuccess(module, url, 'predefined', factory);
	//}

// @todo make these their own functions and use .apply on them
	// If our library failed to load, we'll call upon this function.
	var failed = function() {
		return callbackFailed(module, url, 'failed');
	};

	// Whether a callback comes back as an error/success, they're not always trustworthy.
	// We need to manually check to make sure that our libraries were loaded properly.
	var check = function() {
		factory = me.loader.js.check(module);

		if (!factory) {
			return failed();
		}

		return callbackSuccess(module, url, 'success', factory);
	};

	// Create a new script element instance.
	var element = global.document.createElement('script');

	// Set the actual URL that we're going to request to load for our library.
	element.src = url;

	// Set the type, some legacy browsers require this attribute be present.
	element.type = 'text/javascript';

	// If we get an error callback, bypass any checking and just fail.
	element.onerror = failed;

	// Do our checks and throw our callback.
	element.onload = check;

	// Special event handler for certain versions of IE. @ie
	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
			// Explicity remove the callback after we receive it.
			// Some versions of IE tend to fire off multiple success events.
			this.onreadystatechange = null;

			// Do our checks and throw our callback.
			check();
		}
	};

	// Load our URL on the page.
	return me.head.appendChild(element);
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

	// Fetch all script tags that are on the page.
	var scripts = global.document.getElementsByTagName('script');

	// Check to make sure that we retrieved a `HTMLCollection`, otherwise halt the `Function`.
	if (!me.isHTMLCollection(scripts)) {
		return values;
	}

	// Loop through each of our scripts.
	me.each(scripts, function(script) {
		// If our script instance isn't an `HTMLScriptElement`, then skip the iteration.
		if (!me.isHTMLScriptElement(script)) {
			return;
		}

		// Check to see if our `attribute` exists along with the prefix `data-` for the `attribute` in questino.
		me.each([attribute, 'data-' + attribute], function(attribute) {
			// Fetch the value for the attribute.
			var value = script.getAttribute(attribute);

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

// @todo document it
// @todo if there are no exports, simply rely on the callbacks
me.loader.js.check = function(module) {
	if (module.loader.loaded === true) {
		return true;
	}

	if (me.isFunction(module.check)) {
		return module.check();
	}

	if (module.exports.length) {
		return me.loader.js.check.exports(module.exports);
	}

	// By default just return true, as this function was hit from a success callback.
	return true;
};

// This function will check for the instance of our library based on the exports given. If the instance of our library
// exists it'll be returned, otherwise this function will return `null`.
me.loader.js.check.exports = function(exports) {
	var factory = null;

	// Loop through each of our exports variable, until we find a match.
	me.each(exports, function(variable) {
		// We have to explicity use `eval` because variables will come in many forms. In particular sometimes they will come
		// in the form of being a child of an object. For example `jQuery UI` loads under the `glboal` variable `jQuery.ui`.
		// In order for us to get to this programtically we have to use `eval`.

		/*eslint-disable*/
		try {
			if (factory = eval('window.' + variable)) {
				return false;
			}

			// Force our variable back to a `null`.
			factory = null;
		} catch (exception) {
			me.log('loaderJavaScript', '`fallback.loader.js.factory.exports` threw an exception.', exception);
		}
		/*eslint-enable*/
	});

	return factory;
};

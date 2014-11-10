/* global me */

// @todo remove the auto adding of exports, if exports aren't present then just rely on the native browser callbacks
// @todo critical for css files^^^^^ debating...

me.loader.js = {};

me.loader.js.boot = function(module, url, callbackSuccess, callbackFailed) {
	// If the library is already defined on the page, don't attempt to reload it.
	var factory = me.loader.js.check(module);

	// @todo we need to check if its already on the page*#@$%()
//	if (factory) {
//		return callbackSuccess(module, url, 'predefined', factory);
//	}

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
	var element = window.document.createElement('script');

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

// @todo document it
me.loader.js.check = function(module) {
	if (module.loader.loaded === true) {
		return true;
	}

	if (module.check) {
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
		// in the form of being a child of an object. For example `jQuery UI` loads under the window variable `jQuery.ui`. In
		// order for us to get to this programtically we have to use `eval`.

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

/*global me*/

// The loader object handles asynchronously loading of all the files for the library. It acts as a middle man between
// the `require` function and our loader libraries. Loader libraries for example being `loaderImage.js`,
// `loaderStylesheet.js` and `loaderJavaScript.js`. Those individual libraries are treated as non-logic based loaders.
// Their sole purpose is to simply load a specific URL, then let us know whether it load successfully or not. Any and
// all logic which performs trying additional fallbacks and checks lives within the loader object.
me.loader = {};

// Initialization function for our loader object.
me.loader.init = function() {
	// Automatically configure our library via attributes being set on any `script` elements on the page.
	me.loader.init.autoloader();

	// Flag that our loader has been initialized.
	return me.loader.inited = true;
};

// If the attributes `base` or `data-base` are found on any of the `script` tags within the page when the library is
// loaded, automatically set the `base` variable for our configuration to that `value`. If the attributes `main` or
// `data-main` are found on any of the `script` tags when the library is loaded on the page, automatically load up that
// `value` as a module. If the `value` is a comma delimited string, we'll split on the comma and load each separately.
me.loader.init.autoloader = function() {
	// Fetch `base` and/or `data-base`.
	var base = me.normalizeStringSeries(me.loader.js.attributes('base'));

	// If our `attribute` exists, then configure it.
	if (base.length) {
		// Since `me.autoloader` will return an `Array` series, only use the first value of our `Array`.
		me.config({
			base: base.shift()
		});
	}

	// Fetch `main` and/or `data-main`.
	var main = me.normalizeStringSeries(me.loader.js.attributes('main'));

	// If our `attribute` exists, then `require` it.
	if (main.length) {
		me.require(main);
	}
};

// Attempt to load our module.
me.loader.boot = function(moduleName, callback) {
	// Fetch the instance of our module.
	var module = me.module(moduleName);

	// If our module is already loaded, then skip the loading process and hit the callback.
	if (module.loader.loaded === true) {
		callback();
		return;
	}

	// Push our callback to the queue.
	module.callbacks.push(callback);

	// If this module is currently in the process of being loaded, queue our callback and skip processing.
	if (module.loader.working === true) {
		return;
	}

	// If we made it this far, we need to actually process the module in question.
	module.loader.working = true;

	// Set our start time for statistics.
	module.loader.timeStart = new Date().getTime();

	// Setup our temporary variables to use for our working URLs.
	module.loader.workingURLs = me.arrayClone(module.urls);

	// Make sure to clone our URLs array as we're going to be manipulating it.
	me.loader.urls(module);
};

// Load the URLs passed in for the module in question. This will run a loop through each of the URLs, attempting to
// load one at a time, only stopping when either all URLs have been exhausted or a URL has loaded successfully. Other
// specific checks that determine whether or not a library was actually loaded properly are defined within the loader
// scripts themselves.
me.loader.urls = function(module) {
	// Reference our working URLs.
	var urls = module.loader.workingURLs;

	// If we've exhausted all URLs available for the module, then the library has failed to load.
	if (!urls.length) {
		return me.loader.urls.failed(module);
	}

	// Shift our URL off of the `Array`, that way if we have to loop around, we don't retry the same URL again.
	var url = urls.shift();

	// Throw a log message to the end user.
	me.log('Loader', 'Requesting to load `' + module.name + '` via `' + url + '`');

	// Call upon our specific loader script to load our URL.
	me.loader[module.identity].boot(module, url, me.loader.urls.success, me.loader.urls.failed);
};

// Common operations to perform whether a module loaded successfully or not.
me.loader.urls.completed = function(module) {
	// Flag our module has having already attempted to load.
	module.loader.loaded = true;

	// Set our end time for statistics.
	module.loader.timeEnd = new Date().getTime();

	// Flag our module as no longer in a working/in progress state.
	module.loader.working = false;

	// Fire off all of our callbacks.
	me.module.callbacks(module.name);
};

// When a URL or module fails to load this function will be called.
me.loader.urls.failed = function(module, url) {
	// Legacy IE fires off the failed callback more than once, so we'll double check to see if we've already fired it. @ie
	if (me.indexOf(module.loader.failed, url) !== -1) {
		return;
	}

	// Setup our log message that we'll send to the end user.
	var message = '`' + module.name + '` failed to load ';

	// If there's no URL, then all URLs have been exhausted!
	if (!url) {
		me.loader.urls.completed(module);
		me.log('Loader', message + 'module.');
		return;
	}

	// Reset the anonymous module name.
	me.define.anonymous.reset();

	// Let the end user know which specific URL failed to load.
	module.loader.failed.push(url);
	me.log('Loader', message + ' for URL: ' + url);

	// Try the next URL in our URLs list.
	me.loader.urls(module);
};

// When a URL loads sucessfully this function will be called.
me.loader.urls.success = function(module, url, status, factory) {
	// We're going to store the name of the module we're attempting to load here. This way if the file that's loaded
	// happens to call the `define` function with an anonymous name, this is the name that we'll use for the definition.
	me.define.anonymous(module.name);

	// If our library was already loaded, we don't know what URL was successful, so we'll skip setting it.
	if (status === 'predefined') {
		me.log('Loader', '`' + module.name + '` already loaded on the page; referencing.');
	} else {
		module.loader.success = url;
		me.log('Loader', '`' + module.name + '` loaded successfully `' + url + '`.');
	}

	// If we have a `init` function, we'll run it now.
	if (me.isFunction(module.init)) {
		module.init();
	}

	// If we don't have a factory for our module, then there was no definition. Regardless of what our value is we'll
	// reference it here.
	if (!me.isDefined(module.factory)) {
		module.factory = factory;
		module.invoked = true;
	}

	// Wrap up the loader process and handle our callbacks.
	me.loader.urls.completed(module);
};

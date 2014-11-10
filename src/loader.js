/*global me*/

// The loader object handles asynchronously loading of all the files for the library. It acts as a middle man between
// the `require` function and our loader libraries. Loader libraries for example being `loaderImage.js`,
// `loaderStylesheet.js` and `loaderJavaScript.js`. Those individual libraries are treated as non-logic based loaders.
// Their sole purpose is to simply load a specific URL, then let us know whether it load successfully or not. Any and
// all logic which performs trying additional fallbacks and checks lives within the loader object.
me.loader = {};

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
	me.log('Loader', '`' + module.name + '` is attempting to load via ' + url);

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
	// Setup our log message that we'll send to the end user.
	var message = '`' + module.name + '` failed to load ';

	// If there's no URL, then all URLs have been exhausted!
	if (!url) {
		me.loader.urls.completed(module);
		return me.log('Loader', message + 'module.');
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
	me.define.anonymous(module.name, url);

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
	//	reference it here.
	if (!module.factory) {
		module.invoked = true;
		module.factory = factory;
	}

	// Wrap up the loader process and handle our callbacks.
	me.loader.urls.completed(module);
};

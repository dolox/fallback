/* fallback.js v1.0.1 | https://github.com/dolox/fallback/ | Salvatore Garbesi <sal@dolox.com> | (c) 2013 Dolox Inc. */

fallback = {
	callback: null,
	callbacks: [],

	head: document.getElementsByTagName('head')[0],

	libraries: {},
	libraries_count: 0,

	loaded: {},
	loaded_count: 0,

	fail: {},
	fail_count: 0,

	shim: {}
};

fallback.initialize = function() {
	var library, url, urls;

	for (library in this.libraries) {
		urls = this.libraries[library];

		if (!(urls instanceof Array)) {
			this.libraries[library] = urls = [urls];
		}

		this.libraries_count++;

		if (!this.shim[library]) {
			this.spawn(library, urls[0], 0);
		}
	}
};

fallback.completed = function() {
	this.ready_invocation();

	if (this.libraries_count == this.loaded_count + this.fail_count) {
		this.callback(this.loaded, this.fail);
	}
};

fallback.error = function(library, index) {
	index = parseInt(index);

	if (!this.fail[library]) {
		this.fail[library] = [];
	}

	this.fail[library][this.fail[library].length] = this.libraries[library][index];

	if (index < this.libraries[library].length - 1) {
		this.spawn(library, this.libraries[library][index + 1], index + 1);
	} else {
		this.fail_count++;
	}

	this.completed();
};

fallback.load = function(libraries, options, callback) {
	if (({}).toString.call(options) == '[object Function]') {
		callback = options;
		options = {};
	}

	if (typeof options !== 'object') {
		options = {};
	}

	if (options.shim) {
		this.shim = options.shim;
	}

	if (({}).toString.call(callback) !== '[object Function]') {
		callback = function() {};
	}

	this.callback = callback;
	this.libraries = libraries;
	this.initialize();
};

fallback.ready = function(libraries, callback) {
	var options =  {
		callback: callback,
		libraries: libraries
	};

	if (!(libraries instanceof Array)) {
		options.callback = libraries;
		options.libraries = [];
	}

	this.callbacks[this.callbacks.length] = options;
	this.ready_invocation();
};

fallback.ready_invocation = function(bypass) {
	for (var index in this.callbacks) {
		var options = this.callbacks[index];
		var wipe = false;

		if (options.libraries.length > 0) {
			var count = 0;

			for (library in this.loaded) {
				if (options.libraries.indexOf(library) >= 0) {
					count++;
				}
			}

			if (count == options.libraries.length) {
				options.callback();
				wipe = true;
			}
		}
		
		if (wipe) {
			delete this.callbacks[index];
		}

		if (this.libraries_count == this.loaded_count + this.fail_count && options.libraries.length == 0) {
			options.callback(this.loaded, this.fail);
		}
	}
};

fallback.spawn = function(library, url, index) {
	var defined = eval('window.' + library);

	if (defined) {
		return fallback.success(library, index);
	}

	var element;

	if (url.indexOf('.css') > -1) {
		element = document.createElement('link');
		element.rel = 'stylesheet';
		element.href = url;
	} else {
		element = document.createElement('script');
		element.src = url;
	}

	element.onload = function() {
		fallback.success(library, index);
	};

	element.onreadystatechange = function() {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			this.onreadystatechange = null;

			var defined = eval('window.' + library);

			if (!defined) {
				fallback.error(library, index);
			} else {
				fallback.success(library, index);
			}
		}
	};

	element.onerror = function() {
		fallback.error(library, index);
	};

	this.head.appendChild(element);
};

fallback.success = function(library, index) {
	this.loaded[library] = this.libraries[library][index];
	this.loaded_count++;

	if (this.shim) {
		this.shim_invocation(library);
	}

	this.completed();
};

fallback.shim_invocation = function() {
	for (var shim in this.shim) {
		var count = 0;

		if (!this.loaded[shim]) {
			for (var index in this.shim[shim]) {

				if (this.loaded[this.shim[shim][index]]) {
					count++;
				}
			}

			if (count == this.shim[shim].length) {
				this.spawn(shim, this.libraries[shim][0], 0);
				delete this.shim[shim];
			}
		}
	}
};

window.fallback = fallback;
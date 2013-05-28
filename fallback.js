/*
*    fallback.js v0.1
*
*    @author Salvatore Garbesi <sal@dolox.com>
*    @url https://github.com/sgarbesi/fallback.js
*    @copyright 2013 Dolox Inc.
*/

fallback = {
	callback: null,
	
	ready_invoke: true,
	ready_functions: [],
	
	head: document.getElementsByTagName('head')[0],

	libraries: {},
	libraries_count: 0,

	loaded: {},
	loaded_count: 0,

	broken: {},
	broken_count: 0
};

fallback.initialize = function() {
	var library, url, urls;

	for (library in this.libraries) {
		urls = this.libraries[library];

		if (!(urls instanceof Array)) {
			this.libraries[library] = urls = [urls];
		}

		this.libraries_count++;
		this.spawn(library, urls[0], 0);
	}
};

fallback.completed = function() {
	if (this.libraries_count == this.loaded_count + this.broken_count) {
		if (this.ready_invoke) {
			this.ready_invocation();
		}

		this.callback(this.loaded, this.broken);
	}
};

fallback.error = function(library, index) {
	index = parseInt(index);

	if (!this.broken[library]) {
		this.broken[library] = [];
	}

	this.broken[library][this.broken[library].length] = this.libraries[library][index];

	if (index < this.libraries[library].length - 1) {
		this.spawn(library, this.libraries[library][index + 1], index + 1);
	} else {
		this.broken_count++;
	}

	this.completed();
};

fallback.load = function(libraries, options) {
	var type = {};
	this.ready_invoke = true;

	if (options) {
		if (options.ready_invoke === false) {
			this.ready_invoke = options.ready_invoke;
		}

		if (!options.callback || (options.callback && type.toString.call(options.callback) !== '[object Function]')) {
			options.callback = function() {};
		}
	} else {
		options = {};
		options.callback = function() {};
	}

	this.callback = options.callback;
	this.libraries = libraries;
	this.initialize();
};

fallback.ready = function(callback) {
	this.ready_functions[fallback.length] = callback;
};

fallback.ready_invocation = function() {
	var index;

	if (this.ready_functions) {
		for (index in this.ready_functions) {
			this.ready_functions[index](this.loaded, this.broken);
		}
	}
};

fallback.spawn = function(library, url, index) {
	var script = document.createElement('script');

	script.src = url;
	script.onload = function() {
		fallback.success(library, index);
	};

	script.onerror = function() {
		fallback.error(library, index);
	};

	this.head.appendChild(script);
};

fallback.success = function(library, index) {
	this.loaded[library] = this.libraries[library][index];
	this.loaded_count++;
	this.completed();
};

window.fallback = fallback;
/*
*    fallback.js v0.1
*    https://github.com/sgarbesi/fallback.js
*    (c) 2013 Dolox Inc.
*/

fallback = {
	callback: null,
	head: document.getElementsByTagName('head')[0],

	libraries: {},
	libraries_count: 0,

	loaded: {},
	loaded_count: 0,

	broken: {},
	broken_count: 0
};

fallback.load = function(libraries, callback) {
	var type = {};

	if (!callback || (callback && type.toString.call(callback) !== '[object Function]')) {
		callback = function() {};
	}

	this.callback = callback;
	this.libraries = libraries;
	this.initialize();
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

fallback.success = function(library, index) {
	this.loaded[library] = this.libraries[library][index];
	this.loaded_count++;
	this.completed();
};

fallback.completed = function() {
	if (this.libraries_count == this.loaded_count + this.broken_count) {
		this.callback(this.loaded, this.broken);
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

window.fallback = fallback;
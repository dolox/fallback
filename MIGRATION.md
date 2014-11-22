<p align="center"><a href="http://fallback.io/" target="_blank"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></a></p>
<h1 align="center">Migration Guide</h1>

---

# Getting Started

If you're migrating from `v1` of the library, the process should be fairly easy. In `v1` there were only 2 functions which were officially supported by the project: `fallback.load` and `fallback.ready`. The following guide explains how you can migrate your code to `v2` of the library by updating your code or using polyfills.

---

# fallback.load

In `v1` you'd call this function to immediately load up the library you wanted to use on the page. In `v2` you'll need to first configure (fallback.config) the libraries that you want to make available to Fallback JS, then load (fallback.require).

**v1:**

```
fallback.load({
	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js'
});
```

**v2:**

```
fallback.config({
	libs: {
		JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js'
	}
});

require('JSON');
```

**Polyfill:**

```javascript
fallback.load = function(libraries, options, callback) {
	fallback.config({
		libs: libraries
	});

	var libKeys = [];

	for (var library in libraries) {
		libKeys.push(library);
	}

	fallback.require(libKeys, callback);

	if (typeof options === 'object') {
		if (typeof options.callback === 'function') {
			fallback.require(libKeys, options.callback);
		}

		if (typeof options.shim === 'object') {
			for (var library in options.shim) {
				var libs = {};

				libs[library] = {
					deps: options.shim[library]
				};

				fallback.config({
					libs: libs
				})
			}
		}
	}
};
```

---

# fallback.ready

In `v2` the `fallback.require` function is a drop in replacement for `fallback.ready`. Simply rename everywhere you're referencing `fallback.ready` to `fallback.require` (or one of it's aliases) and you're done! Or if you don't want to change your code, try using the polyfill below.

**v1:**

```
fallback.ready(['jQuery'], function() {
	// Execute my code here...
});
```

**v2:**

```
fallback.require(['jQuery'], function() {
	// Execute my code here...
});
```

**Polyfill:**

```javascript
fallback.ready = fallback.require;
```

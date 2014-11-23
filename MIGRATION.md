<p align="center"><a href="http://fallback.io/" target="_blank"><img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" /></a></p>
<h1 align="center">Migration Guide</h1>

---

# Getting Started

If you're migrating from `v1` of the library, the process should be fairly easy. In `v1` there were only 2 functions which were officially supported by the project: `fallback.load` and `fallback.ready`. The following guide explains how you can migrate your code to `v2` of the library by updating your code.

---

# fallback.load

In `v1` you'd call this function to immediately load up the library you wanted to use on the page. In `v2` you'll need to first configure (fallback.config) the libraries that you want to make available to Fallback JS, then load (fallback.require). There's also a change for including CSS files where you must prefix the library key with `css$`. *See below.*

**v1:**

```
fallback.load({
	// Twitter Bootstrap Stylesheet
	'.col-xs-1': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min',

	// JSON library for legacy browsers.
	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js'
}, {
	// Force certain libraries to load before others.
	shim: {
		// Load the JSON library before the Twitter Bootstrap stylesheet.
		'.col-xs-1': ['JSON']
	}
});
```

**v2:**

```
fallback.config({
	libs: {
		// Twitter Bootstrap Stylesheet
		css$bootstrap: {
			// We must specify a style that exists in the stylesheet so we can determine if it loads properly.
			export: '.col-xs-1',

			// Load the JSON library before the Twitter Bootstrap stylesheet.
			deps: 'JSON',

			// The URLs to load the Stylesheet.
			urls: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min'
		},

		// JSON library for legacy browsers.
		JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js'
	}
});

require(['css$bootstrap', 'JSON]);
```

---

# fallback.ready

In `v2` the `fallback.require` function is a drop in replacement for `fallback.ready`. Simply rename everywhere you're referencing `fallback.ready` to `fallback.require` (or one of it's aliases) and you're done!

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

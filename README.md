fallback.js
===========
*** this documentation will be updated shortly. the keys for the JavaScript libraries you wish to load need to be their variable names. for instance jquery is "window.jQuery" so the key needs to be "jQuery" in order for this to work in older versions of IE.


#### The library is only 1.7 KB!!!

## About
* _JavaScript library for dynamically loading CSS and JS files._
* _Ability to load multiple files from a CDN with multiple fallback options._
* _Load scripts on demand for faster page load time!_
* _Loads all scripts in parralel!_
* _It's extremely easy to implement!_
* __This is the only external script that needs to be loaded in your HTML!__


## API
### fallback.ready(function)
`function`
- Ready expects a function and will execute after `load` has completed.
- You can call ready multiple times throughout any of your scripts as it will chain all your functions and execute them upon completion.


### fallback.load(libraries, options)
`libraries`
- Object that expects its values to be either a string or array of urls.
- You can pass either an array or string as the value for each library.
- All libraries will be executing in parallel.
- The fallback libraries will be executed in the order they are in the array.

`options`
- Expects parameter to be an object.
- `callback` must be a function, which will return a success and failure object as individual parameters. ex: function(success, failed)
- `ready_invoke` defaults to true. If set to false, when fallback is completed it will not invoke the .ready function.
- `shim` ability to set libraries to wait in line for other libraries to finish loading.

```javascript
fallback.load({
	// Stylesheet support. If a file contains .css it will attempt to load it as a stylesheet.
	css: 'index.css',

	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
	],

	'jQuery.ui': [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js'
	]
}, {
	// Only load jquery ui after jquery itself has loaded!
	shim: {
		'jQuery.ui': ['jQuery']
	},

	callback: function(success, failed) {
		// Inline callback
	}
});

fallback.ready(function() {
	// Completed
});
```


## Changelog
### v0.2 / 2013-06-13
- Fixes for IE 7, 8 and 9.
- Added MIT license.
- Added .gitignore
- Added `release` branch.

### v0.1 / 2013-05-27
- Initial release.


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/e57ed3fad26831b768bd39ff002571a2 "githalytics.com")](http://githalytics.com/sgarbesi/fallback.js)

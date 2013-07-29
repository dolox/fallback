fallback.js
===========
#### LATEST VERSION 1.0.3
*** Tested and working in Chrome, FireFox, Safari, Opera and IE 7 - 10

*** This documentation will be updated shortly. **The keys for the JavaScript libraries you wish to load need to be their variable names.** For instance jquery is "window.jQuery" so the key needs to be "jQuery" in order for this to work in older versions of IE.

#### The library is only 2 KB!!!

## About
* _JavaScript library for dynamically loading CSS and JS files._
* _Ability to load multiple files from a CDN with multiple fallback options._
* _Load scripts on demand for faster page load time!_
* _Loads all scripts in parralel!_
* _It's extremely easy to implement!_
* __This is the only external script that needs to be loaded in your HTML!__

## Todo
- `import` function that will allow you add all your libraries and .ready will lazy load when attempting to use the library in question.
- `baseUrl` ability to set a base url for local files.

## API
### fallback.ready([object], function)
`[object]`
- *Is optional.* If object is not passed it will assume it's the callback function.
- You can pass an array of libraries that you only want to execute your code for.

`function`
- Ready expects a function and will execute after `load` has completed.
- You can call ready multiple times throughout any of your scripts as it will chain all your functions and execute them upon completion.


### fallback.load(libraries, options, callback)
`libraries`
- Object that expects its values to be either a string or array of urls.
- You can pass either an array or string as the value for each library.
- All libraries will be executing in parallel.
- The fallback libraries will be executed in the order they are in the array.

`options`
- Expects parameter to be an object.
- `shim` ability to set libraries to wait in line for other libraries to finish loading.

`callback`
- Must be a function, which will return a success and failure object as individual parameters. ex: function(success, failed)

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
	}
}, function(success, failed) {
	// Inline callback
});

fallback.ready(['jQuery'], function() {
	// jQuery Completed
});

fallback.ready(function() {
	// Completed
});
```


## Changelog
### v1.0.3 / 2013-07-28
- Fixing broken ready function in IE7-9. Contributors @displague
- Fixing issues with IE7 and IE8 due to new changes/adjustments.
- Added utility functions to trim down code and support older versions of IE.
- Fixed example index.html so that no console notices/errors are thrown in IE.
- Added POSTLOAD test to example.

### v1.0.2 / 2013-07-27
- Added .jshintrc file and fixes for JSHint validation. Contributors: @displague
- Updated the closure.sh file to auto prepend the tagline.
- Update example/index.js for the minifier's externs that way window.fallback doesn't get removed.

### v1.0.1 / 2013-07-26
- Bug with .ready() function not being called. Contributors: @mrgamer @claudyus
- Updates to the example demonstration.

### v1.0.0 / 2013-07-20
- Initial public release.
- Added bower.json and to bower repository.
- Added ability to call .ready() after libraries have already loaded.

### v0.3.0 / 2013-06-14
- Removed `ready_invoke` option.
- Added the ability to pass in an array of libraries to the `ready` event.

### v0.2.0 / 2013-06-13
- Fixes for IE 7, 8 and 9.
- Added MIT license.
- Added .gitignore
- Added `release` branch.

### v0.1.0 / 2013-05-27
- Initial development release.


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/e57ed3fad26831b768bd39ff002571a2 "githalytics.com")](http://githalytics.com/sgarbesi/fallback.js)

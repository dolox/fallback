code documentation
	[x] config
	[x] core
	[x] define
	[x] loader
	[x] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

unit tests
	[ ] config
	[x] core
	[ ] define
	[ ] loader
	[ ] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

@todo
	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false
	fix broken saucelabs image in the README
	update the bower json ignore list for the docs, tests, configs from travis. simply include the dist, readme, bower file
	allow ability to stick version #s on the libraries combines w/ FBK CLI
	add loader delimiter to the config file.
	grep for `indexOf` and use `me.indexOf`
	integrate and test `define.amd = {};`
	dont automatically import aliases as exports, fix that shit
	strip all me.logs(), me.banner, me.log and me.stats function from minification version
	automatically rename the docs fallback.html to index.html after it's generated.

readme documentation
	- document the debugger levels
	- delimiter is changeable.
	- add `init` and `check` functions for libs.
	- redocument the `global` attribute in config.
	- change README.md to README.hbs and automatically generate it with the current version # and file sizes of the dists.
	- make links from the root of the project to fallback.min.js in the dist folder.
	- cleanup in the examples folder and code document them better for people.

contributing
	- Follow https://github.com/rwaldron/idiomatic.js/
		- Style Guidlines: Real Tabs, Single Quotes, No padding spaces in parenthesis: if ( a )
	- update sample code on the website and file size
	- 301 fallbackjs.com to fallback.io

---

- migration code from 1.0 to 2.0

---

fallback CLI utility where it automatically adds your libraries to a JSON file and installs via bower
	Programmatic API --- http://bower.io/docs/api/#programmatic-api
	real easy, fallback install bang, same commands hopefully

grunt-fallback-annotate --> similar to grunt-ng-annotate
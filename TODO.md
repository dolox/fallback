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
	
run tests sequentially: https://github.com/karma-runner/karma-sauce-launcher/issues/8

@todo
	make sure that `global` is actually being referenced everywhere and not window
	the exports check needs to use the global variable! if global is set to null, dont do the exports check!
	fallback.config -> input -> global --- double check this documentation

	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false

	allow ability to stick version #s on the libraries combines w/ FBK CLI

	add loader delimiter to the config file.

	grep for `indexOf` and use `me.indexOf`

	integrate and test `define.amd = {};`

	dont automatically import aliases as exports, fix that shit

	strip all me.logs(), me.banner, me.log and me.stats function from minification version

readme documentation
	- document the debugger levels
	- make a large note at the top about contributing.md
	- update sample code on the website and file size
	- 301 fallbackjs.com to fallback.io

---

- migration code from 1.0 to 2.0

---

fallback CLI utility where it automatically adds your libraries to a JSON file and installs via bower
	Programmatic API --- http://bower.io/docs/api/#programmatic-api
	real easy, fallback install bang, same commands hopefully

grunt-fallback-annotate --> similar to grunt-ng-annotate
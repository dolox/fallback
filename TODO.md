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

	run through and set the log priorities

	angular js example

	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false

	allow ability to stick version #s on the libraries combines w/ FBK CLI

	integrate and test `define.amd = {};`

readme documentation
	- document the directories and what their for
	
	- fallback.config -> input -> global --- fix the docs
	- document the debugger levels
	- update sample code on the website and file size
	- 301 fallbackjs.com to fallback.io

---

- migration code from 1.0 to 2.0

---

fallback CLI utility where it automatically adds your libraries to a JSON file and installs via bower
	Programmatic API --- http://bower.io/docs/api/#programmatic-api
	real easy, fallback install bang, same commands hopefully

grunt-fallback-annotate --> similar to grunt-ng-annotate
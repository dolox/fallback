bugs
	[ ] if you add a anon dependency, and if that dep loads with a differently defined name, you need to alias it off.
	[ ] anony null not defining properly
	[ ] anon undefned not defining properly

re-run through unit tests, and add type checking for the actual functions/vars at the top of each
segregate the couple integration tests into the integration folder

unit tests
	[x] config
	[x] core
	[ ] define
	[ ] loader
	[ ] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

@todo

	run through and set the log priorities and make sure logs are set properly

	angular js example

	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false

	allow ability to stick version #s on the libraries combines w/ FBK CLI

	add the modulename to script/image/etc tags that are stuck in the HTML

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
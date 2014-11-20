[ ] allow the libs to accept a version # for semver
[ ] make sure exports function uses key as default is undefined
	automatically add the library key as exports, if exports arent specified like v1.0 did
[ ] make sure init functino works properly
[ ] setup define.amd on amd enforcement
[ ] allow debug to take boolean for all/off or the strings
	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false
[ ] define and require functions to have 2nd factory which is for error if any depednencies have failed to load or double anon module in same file
[ ] minify version needs to have the banner
[ ] strip out all the logs from the minify version and the log function
[ ] add directory descriptions to the contributing documentation
[ ] fix migration polyfills --[ ] .importer
[ ] fix me.log to have no colors in legacy browsers
[ ] fix all log messages in project to be more helpful and leading
[ ] if there's no URLs it should use a anonymous module
[ ] change the gruntfile back to localhost from 10.0.1.2
[ ] add the log levels to config and fix the unit tests boolean/string
[ ] angular js example
[ ] define.amd exmaple
[ ] need to document data-main and data-base attributes
[ ] update sample code on the website and file size
[ ] 301 fallbackjs.com to fallback.io
[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly
[ ] list fallback cli tool in the readme doc
[ ] update cdnjs, attempt to automate pull requests

TESTS

unit tests
	[x] config
	[x] core
		[ ] parallel.anonymous
	[ ] define
	[ ] loader
	[ ] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

integration tests
	core
		browser.IE11
		...

	define
		define
		define.anonymous
		define.anonymous.*
		define.module
		define.module.last

	loader
		init
		init.autoloader
		boot
		urls
		completed
		failed
		success

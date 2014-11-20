[ ] fix me.log to have no colors in legacy browsers
[ ] fix all log messages in project to be more helpful and leading

[ ] strip out all the logs from the minify version and the log function
[ ] minify version needs to have the banner

[ ] define and require functions to have 2nd factory which is for error if any depednencies have failed to load or double anon module in same file


[ ] fix migration polyfills --[ ] .importer
[ ] angular js example
[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly including for all examples




[ ] docs
	[ ] document stats and version please
	[ ] add directory descriptions to the contributing documentation
	[ ] need to document data-main and data-base attributes

[ ] cleanup
	[ ] change the gruntfile back to localhost from 10.0.1.2
	[ ] update sample code on the website and file size
	[ ] 301 fallbackjs.com to fallback.io
	[ ] update cdnjs, attempt to automate pull requests

TESTS

unit tests
	me.config.libs.populate ->>> auto settings exports
	me.config ->> setting define.amd = {};

	- config log levels
		me.log <--- check for false/true with specific debug values set
		me.config.debug
		me.config.debug.whitelist

		me.config.libs.version

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

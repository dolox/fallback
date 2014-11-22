[ ] define and require functions to have 2nd factory which is for error if any depednencies have failed to load or double anon module in same file

[ ] anonymous modules defineName broken

[ ] examples
	[ ] fix migration polyfills --[ ] .importer
	[ ] angular js example

[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly including for all examples

[ ] change the gruntfile back to localhost from 10.0.1.2

[ ] finish writing the README.docs for the last few things
	[ ] state that logging won't work in minify version for better compression
	[ ] config.amd fix the wording

[ ] cleanup
	[ ] update sample code on the website and file size
	[ ] 301 fallbackjs.com to fallback.io
	[ ] make sure cdnjs is automating pull requests from package.json





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
		[ ] isIE
		[ ]  me.getProperty
		[ ] isIE11
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

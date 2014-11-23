check nodejs add another loader if needed

define undefine ?

full run through







[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly including for all examples

[ ] change the gruntfile back to localhost from 10.0.1.2

[ ] finish writing the README.docs for the last few things
	[ ] state that logging won't work in minify version for better compression
	[ ] config.amd fix the wording
	[ ] error callbacks about halting factory executions down the waterfall

[ ] cleanup
	[ ] update sample code on the website and file size
	[ ] 301 fallbackjs.com to fallback.io
	[ ] make sure cdnjs is automating pull requests from package.json
	[ ] stats better docs




TESTS

unit tests
	me.config.libs.populate ->>> auto settings exports
	me.config ->> setting define.amd = {};

	me.stats moved to its own file

	- config log levels
		me.log <--- check for false/true with specific debug values set
		me.config.debug
		me.config.debug.whitelist
		
		me.config.libs.version

	[x] config
	[x] core
		[ ] me.init.aliases
		[ ] parallel.anonymous
		[ ] isIE
		[ ]  me.getProperty
		[ ] me.isPrefixed
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

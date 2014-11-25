
// @todo config.amd cannot override. you need to stop auto overloading globals and instead stick the config its own saved Object base. me.config.settings ?
// @todo rename all the functions to me.is.array, me.is.object, me.is...etcc
me.init.aliases to me.alias() and me.alias.types
me.init.utilites to me.is.init();
me.log <-- branch out into functions

[ ] when loading an anon module and specifying the same name the code breaks... ex require(abc123), define(abc123, function()) <---- breaks. fix it

[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly including for all examples

[ ] change gruntfile back to `localhost` instead of `10.0.1.2`

[ ] finish writing the README.docs for the last few things
	[ ] add all examples to README
	[ ] state that logging won't work in minify version for better compression
	[ ] config.amd fix the wording
	[ ] error callbacks about halting factory executions down the waterfall
	[ ] details about nodejs, make sure npm install works, thanks

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

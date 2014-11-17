@todo tests
	unit
		core
			parallel.anonymous
	integration
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



	acceptance
		...


	it('to always return undefined', function() {
		expect(fallback.each()).to.be(undefined);
	});


	// fallback.init
	
	it('fallback.head should be a reference to the documents head element', function() {
		expect(fallback.head).to.be.an('object');
	});

	fallback.each({
		fallback: 'object',
		require: 'function',
		define: 'function'
	}, function(type, reference) {
		it(reference + ' reference should exist in the `window`', function() {
			expect(window[reference]).to.be.an(type);
		});
	});

	it('the loader module should be initialized', function() {
		expect(fallback.loader.inited).to.equal(true);
	});
	
	



change grunt test to grunt tests
automatically add the library key as exports, if exports arent specified like v1.0 did


bugs
	[ ] fix me.log to have no colors in legacy browsers
	[ ] fix all log messages in project to be more helpful and leading
	[ ] if there's no URLs it should use a anonymous module
	[ ] change the gruntfile back to localhost from 10.0.1.2

re-run through unit tests, and add type checking for the actual functions/vars at the top of each
segregate the couple integration tests into the integration folder

unit tests
	[ ] config
	[ ] core
	[ ] define
	[ ] loader
	[ ] loaderImage
	[ ] loaderJavaScript
	[ ] loaderStylesheet
	[ ] module
	[ ] require

[ ] full run through in IE6-11, safari, firefox, chrome, makes sure it's working properly

@todo

	rip the logs out of the min file and prepend the banner

	angular js example

	allow config to pass in logging levels for debug: 'warn', 'info', 'error', or false

	allow ability to stick version #s on the libraries combines w/ FBK CLI

	add the modulename to script/image/etc tags that are stuck in the HTML

	integrate and test `define.amd = {};`

readme documentation
	- document the directories and what their for
	- need to document data-main and data-base attributes
	- fallback.config -> input -> global --- fix the docs
	- document the debugger levels
	- update sample code on the website and file size
	- 301 fallbackjs.com to fallback.io

---

fallback CLI utility where it automatically adds your libraries to a JSON file and installs via bower
	Programmatic API --- http://bower.io/docs/api/#programmatic-api
	real easy, fallback install bang, same commands hopefully

grunt-fallback-annotate --> similar to grunt-ng-annotate
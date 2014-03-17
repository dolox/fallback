CHANGELOG:
add use strict for jshint
minify plugins to dist.

	core:
		override -- if set to true define can be override for require and define functions
		namespace -- @todo

@todo requirejs.js
	- turn globals off by def
	- change `dependenciess` to `shims` --- requirejs fallback plz thx
	- fix shim config to use requirejs configs

@todo migrate.js
	- fallback.ready success and failed variables for the old thang :O

@todo travis.yml
@todo david-dm
@todo sauce labs


@todo check that init function works properly especially w/ jquery noconflict!

config.init.jQuery = function() {
	// on init noConflict
};



// @todo require js migration look at the shim/config

- Maintain header comment in 1 file, not multiples through Grunt

- Follow https://github.com/rwaldron/idiomatic.js/
Style Guidlines: Real Tabs, Single Quotes, No padding spaces in parenthesis: if ( a )


- Document everything, heavy comments in code.

- Add SauceLabs: https://saucelabs.com/account?new=1

- Add Travic CI: https://travis-ci.org/

- Add David DM: https://david-dm.org/

Unit Tests




website:
	- ok first you need to minify all the site css and js files.
	- create a new branch gh-pages for the website: http://blog.teamtreehouse.com/using-github-pages-to-host-your-website

library:
	- v1: before making a push, check TTM mobile patch for IE and apply to current.
	- v1: fix ie8 bug on TTM mobile. @todo remove css check
	- finish the unit test and look for bugs.
	- finish the documentation.
	- push everything to the master. this is version 2.0

---

tests for require/define:
	- define/require in same file
	- define/require in different file
	- define/require in different file but defined in paths{}
	- define/require in a different file with dep in the remote file for other deps in paths{}
	- define/require in a different file with dep in the remote file for other deps not in paths{}

update to tests:
	core.config.input --- added debug
	core.utility.types --- added boolean
	core.config --- added debug
	core.config.paths
	core.config.paths.url
	
	amd -- bootstrap
	amd -- initialize
	define
	defineModule
	require
	require.invoke